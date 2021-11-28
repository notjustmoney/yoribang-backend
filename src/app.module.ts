import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TwilioModule } from 'nestjs-twilio';
import { FirebaseModule } from 'nestjs-firebase';
import { AuthModule } from '@auth/auth.module';
import { GqlConfigService } from '@config/graphql';
import { StorageConfigModule } from '@config/storage/configuration.module';
import { FirebaseConfigModule } from '@config/firebase/configuration.module';
import { AuthConfigModule } from '@config/auth/configuration.module';
import { ServeStaticConfigService } from '@config/serve-static/servce-static.options';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@module/user/user.module';
import { RecipeModule } from '@module/recipe/recipe.module';
import { PrismaService } from './module/shared/prisma/prisma.service';

const APP_MODULES = [AuthModule, UserModule, RecipeModule];
const CONFIG_MODULES = [
  FirebaseConfigModule,
  AuthConfigModule,
  StorageConfigModule,
];

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
    MulterModule.register({
      dest: '/uploads',
    }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticConfigService,
      extraProviders: [PrismaService],
    }),
    ...APP_MODULES,
    ...CONFIG_MODULES,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [CacheModule, ...CONFIG_MODULES],
})
export class AppModule {}
