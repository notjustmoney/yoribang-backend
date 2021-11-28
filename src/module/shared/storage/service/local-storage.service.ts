import { ReadStream } from 'fs';
import { Injectable } from '@nestjs/common';
import { FileGroup } from '../../../../core/graphql/schema';
import { PrismaService } from '../../prisma/prisma.service';
import { StorageService } from '../interface/storage.interface';
import { StorageUtil } from '../storage.util';
import { Attachment } from '@prisma/client';
import { StorageConfigService } from '../../../../config/storage/configuration.service';

@Injectable()
export class LocalStorageSerivce implements StorageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageConfig: StorageConfigService,
  ) {}

  async uploadFileInformation(
    file: Express.Multer.File,
    groupName: FileGroup,
    userId: string,
  ) {
    const { id: fileGroupId } = await this.prisma.attachmentGroup.findFirst({
      where: { name: groupName },
    });
    console.log('service', file.path.includes('uploads'));
    return this.prisma.attachment.create({
      data: {
        id: StorageUtil.filterExtensionFromFileName(file),
        path: StorageUtil.filterFileNameFromFilePath(file),
        fileName: `${file.filename}`,
        originalName: StorageUtil.filterExtensionFromOriginalName(file),
        mimeType: file.mimetype,
        extension: StorageUtil.getFileExtension(file),
        uploader: { connect: { id: userId } },
        group: { connect: { id: fileGroupId } },
      },
    });
  }

  findById(id: string) {
    return this.prisma.attachment.findUnique({
      where: { id },
    });
  }

  calcFileUrl(file: Attachment) {
    return `${this.storageConfig.protocol}://${this.storageConfig.host}:${this.storageConfig.port}/${file.path}/${file.fileName}`;
  }

  private validateFile(stream: ReadStream, mimetype: string) {
    console.log(mimetype);
  }
}
