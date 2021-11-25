import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { FirebaseConfigService } from './configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        GOOGLE_APPLICATION_CREDENTIAL: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService, FirebaseConfigService],
  exports: [ConfigService, FirebaseConfigService],
})
export class FirebaseConfigModule {}
