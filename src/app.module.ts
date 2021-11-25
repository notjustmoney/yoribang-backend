import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TwilioModule } from 'nestjs-twilio';
import { FirebaseModule } from 'nestjs-firebase';
import { GqlConfigService } from '@config/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseConfigModule } from './config/firebase/configuration.module';
import { AuthConfigModule } from './config/auth/configuration.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './module/user/user.module';

const APP_MODULES = [AuthModule, UserModule];
const CONFIG_MODULES = [FirebaseConfigModule, AuthConfigModule];

@Module({
  imports: [
    GraphQLModule.forRootAsync({ useClass: GqlConfigService }),
    CacheModule.register({ isGlobal: true }),
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
    FirebaseModule.forRoot({
      googleApplicationCredential: process.env.GOOGLE_APPLICATION_CREDENTIAL,
    }),
    ...APP_MODULES,
    ...CONFIG_MODULES,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [CacheModule, ...CONFIG_MODULES],
})
export class AppModule {}
