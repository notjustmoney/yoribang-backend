import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User, UserStatus } from '@prisma/client';
import { PrismaService } from '@module/shared/prisma/prisma.service';
import { AuthConfigService } from '@config/auth/configuration.service';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';

export const STRATEGY_JWT_AUTH = 'jwt-auth';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(
  Strategy,
  STRATEGY_JWT_AUTH,
) {
  constructor(
    private readonly authConfig: AuthConfigService,
    private readonly prisma: PrismaService,
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
    });
  }

  async validate(token: string): Promise<User> {
    const firebaseUser = await this.firebase.auth.verifyIdToken(token, true);
    const { uid: id } = firebaseUser;

    const user = await this.prisma.user.findUnique({
      where: { id },
      rejectOnNotFound: false,
    });
    if (!user) {
      throw new Error('User not found');
    }
    if (user.status === UserStatus.DEACTIVE) {
      throw new Error('User deactive');
    }
    if (user.status === UserStatus.BANN) {
      throw new Error('User banned');
    }

    await this.prisma.user.update({
      data: { loginAt: new Date() },
      where: { id },
    });
    return user;
  }
}
