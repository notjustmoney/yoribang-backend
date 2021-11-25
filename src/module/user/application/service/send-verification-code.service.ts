import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';

@Injectable()
export class SendVerificationCodeService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectTwilio() private readonly client: TwilioClient,
  ) {}

  async sendVerificationCode(phoneNumber: string) {
    const verificationCode = await this.generateVerificationCode(phoneNumber);
    try {
      console.log('verification code is generated');
      await this.client.messages.create({
        body: `[요리방] 인증번호는 ${verificationCode} 입니다.`,
        to: phoneNumber, // Text this number
        from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
      });
    } catch (err) {
      throw err;
    }
  }

  private async generateVerificationCode(phoneNumber: string) {
    const verificationCode = '123456';
    await this.cacheManager.set(`code:${phoneNumber}`, verificationCode, {
      ttl: 180,
    });
    return verificationCode;
  }
}
