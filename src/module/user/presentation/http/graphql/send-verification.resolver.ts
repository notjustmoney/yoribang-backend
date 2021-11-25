import { Body } from '@nestjs/common';
import { Resolver, Mutation } from '@nestjs/graphql';
import { SendVerificationCodeInput } from '../../../../../core/graphql/schema';
import { SendVerificationCodeService } from '../../../application/service/send-verification-code.service';

@Resolver('User')
export class SendVerificationResolver {
  constructor(
    private readonly sendVerificationCodeSerivce: SendVerificationCodeService,
  ) {}

  @Mutation('sendVerificationCode')
  async signup(@Body('input') input: SendVerificationCodeInput) {
    const { phoneNumber } = input;
    return this.sendVerificationCodeSerivce.sendVerificationCode(phoneNumber);
  }
}
