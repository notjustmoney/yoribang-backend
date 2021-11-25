import { Body } from '@nestjs/common';
import { Resolver, Mutation } from '@nestjs/graphql';
import { LoginInput } from '../../../../../core/graphql/schema';
import { LoginService } from '../../../application/service/login.service';

@Resolver('User')
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @Mutation('login')
  async login(@Body('input') input: LoginInput) {
    const { phoneNumber, verificationCode } = input;
    return this.loginService.login(phoneNumber, verificationCode);
  }
}
