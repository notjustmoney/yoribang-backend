import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
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

  @ResolveField('avatar')
  async findAvatar(@Parent() user: User) {
    const { avatarId } = user;
    return {
      id: '1sdafhjsdhfjsakld',
      path: 'file-path-example',
      fileName: 'server-name',
      originalName: 'real-name',
      extension: 'jpg',
    };
  }
}
