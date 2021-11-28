import * as fs from 'fs';
import { v4 as uuid } from 'uuid';
import { diskStorage } from 'multer';
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { StorageUtil } from '../storage.util';

export const LocalStorageInterceptor = () =>
  applyDecorators(
    UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: (req, file, cb) => {
            const user = req.user as User;
            if (!user) {
              cb(new Error('Not authorized'), null);
            }
            const fileType = StorageUtil.getFileType(file);
            const filePath = `uploads/${user.id}/${fileType}`;
            if (!fs.existsSync(filePath)) {
              fs.mkdirSync(filePath, { recursive: true });
            }
            cb(null, filePath);
          },
          filename: (req, file, cb) => {
            file.filename = `${uuid()}.${StorageUtil.getFileExtension(file)}`;
            cb(null, file.filename);
          },
        }),
      }),
    ),
  );
