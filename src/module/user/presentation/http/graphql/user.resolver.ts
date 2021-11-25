import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from '../../../../../auth/decorator/current-user.decorator';
import { JwtAuthGuard } from '../../../../../auth/guard/jwt-auth.guard';
import { PrismaService } from '../../../../shared/prisma/prisma.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query('userById')
  async userById(@Args('id') id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  @Query('me')
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: User) {
    return user;
  }
}
