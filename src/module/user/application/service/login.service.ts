import * as faker from 'faker/locale/ko';
import { v4 as uuid } from 'uuid';
import { Cache } from 'cache-manager';
import { InjectFirebaseAdmin, FirebaseAdmin } from 'nestjs-firebase';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma/prisma.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async login(phoneNumber: string, verificationCode: string) {
    await this.verifyCode(phoneNumber, verificationCode);

    let user = await this.prisma.user.findUnique({
      where: { phoneNumber },
      rejectOnNotFound: false,
    });

    if (!user) {
      user = await this.signup(phoneNumber);
    }
    /* generate token */
    const token = await this.generateToken(user.id);
    await this.deleteVerificationCode(phoneNumber);
    return token;
  }

  private async verifyCode(phoneNumber: string, verificationCode: string) {
    const issuedVerificationCode = await this.findVerificationCodeByPhoneNumber(
      phoneNumber,
    );
    if (issuedVerificationCode !== verificationCode) {
      throw new Error('verfication code not matched');
    }
  }

  private async findVerificationCodeByPhoneNumber(phoneNumber: string) {
    /* get code */
    const verificationCode: string = await this.cacheManager.get(
      `code:${phoneNumber}`,
    );
    if (!verificationCode) {
      throw new Error('verification not exist');
    }
    return verificationCode;
  }

  private async generateToken(id: string) {
    /* TODO: needs to check custom token */
    return await this.firebase.auth.createCustomToken(id);
  }

  private async signup(phoneNumber: string) {
    const id = uuid();
    const nickname = this.generateNickname();
    const serialCode = await this.generateSerialCode(nickname);
    const user = await this.prisma.user.create({
      data: {
        id,
        phoneNumber,
        serialCode,
        nickname,
      },
    });
    await this.firebase.auth.createUser({
      uid: id,
      phoneNumber,
    });
    return user;
  }

  private generateNickname() {
    return faker.name.firstName();
  }

  private async generateSerialCode(nickname: string) {
    let count = await this.prisma.user.count({ where: { nickname } });
    /* TODO: Transaction handle */
    return count++;
  }

  private async deleteVerificationCode(phoneNumber: string) {
    await this.cacheManager.del(`code:${phoneNumber}`);
  }
}
