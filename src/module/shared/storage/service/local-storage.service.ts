import { v4 as uuid } from 'uuid';
import { createWriteStream, ReadStream } from 'fs';
import { Injectable } from '@nestjs/common';
import { FileGroup } from '../../../../core/graphql/schema';
import { PrismaService } from '../../prisma/prisma.service';
import { StorageService } from '../interface/storage.interface';

@Injectable()
export class LocalStorageSerivce implements StorageService {
  constructor(private readonly prisma: PrismaService) {}

  upload(
    createReadStream: () => ReadStream,
    fileName: string,
    extension: string,
    fileGroup: FileGroup,
    userId: string,
  ) {
    const fileId = uuid();
    return new Promise(async (res, rej) =>
      createReadStream()
        .pipe(createWriteStream(`/uploads/${userId}/${fileId}`))
        .on('finish', () => res(true))
        .on('error', () => rej(false)),
    );
    // return {
    //   id: '1sdafhjsdhfjsakld',
    //   path: 'file-path-example',
    //   fileName: 'server-name',
    //   originalName: 'real-name',
    //   extension: 'jpg',
    // };
  }

  findById(id: string) {
    return this.prisma.attachment.findUnique({
      where: { id },
    });
  }

  private validateFile(stream: ReadStream, mimetype: string) {
    console.log(mimetype);
  }
}
