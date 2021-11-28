import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { StorageConfigService } from './configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        STORAGE_HOST: Joi.string().required(),
        STORAGE_PROTOCOL: Joi.string().required(),
        STORAGE_PORT: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService, StorageConfigService],
  exports: [ConfigService, StorageConfigService],
})
export class StorageConfigModule {}
