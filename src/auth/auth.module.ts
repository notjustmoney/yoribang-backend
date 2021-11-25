import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthConfigModule } from '../config/auth/configuration.module';
import { FirebaseConfigService } from '../config/firebase/configuration.service';
import { PrismaService } from '../module/shared/prisma/prisma.service';
import { AUTH_STRATEGIES } from './strategy';
import { STRATEGY_JWT_AUTH } from './strategy/jwt-auth.strategy';

@Module({
  imports: [
    AuthConfigModule,
    PassportModule.register({ defaultStrategy: STRATEGY_JWT_AUTH }),
  ],
  providers: [FirebaseConfigService, PrismaService, ...AUTH_STRATEGIES],
  exports: [PassportModule],
})
export class AuthModule {}
