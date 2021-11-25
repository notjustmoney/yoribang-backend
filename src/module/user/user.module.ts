import { Module } from '@nestjs/common';
import { FirebaseModule } from 'nestjs-firebase';
import { AuthModule } from '@auth/auth.module';
import { SharedModule } from '@module/shared/shared.module';
import { PrismaService } from '../shared/prisma/prisma.service';
import { APPLICATION_SERVICES } from './application/service';
import { USER_RESOLVERS } from './presentation/http/graphql';

@Module({
  imports: [SharedModule, FirebaseModule, AuthModule],
  controllers: [],
  providers: [PrismaService, ...APPLICATION_SERVICES, ...USER_RESOLVERS],
})
export class UserModule {}
