import { Module } from '@nestjs/common';
import { StorageConfigService } from '../../config/storage/configuration.service';
import { PrismaService } from './prisma/prisma.service';
import { StorageResolver } from './storage/presentation/http/graphql/attachment.resolver';
import { AttachmentController } from './storage/presentation/http/rest/attachment.controller';
import { LocalStorageSerivce } from './storage/service/local-storage.service';

@Module({
  providers: [
    PrismaService,
    LocalStorageSerivce,
    StorageResolver,
    StorageConfigService,
  ],
  controllers: [AttachmentController],
  exports: [PrismaService, LocalStorageSerivce, StorageResolver],
})
export class SharedModule {}
