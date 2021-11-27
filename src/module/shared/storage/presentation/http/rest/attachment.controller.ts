import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@auth/guard/jwt-auth.guard';
import { User } from '@prisma/client';
import { LocalStorageSerivce } from '../../../service/local-storage.service';

@Controller('attachment')
export class AttachmentController {
  constructor(private readonly storageService: LocalStorageSerivce) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const user = req.user as User;
          if (!user) {
            cb(new Error('Not authorized'), null);
          }
          const fileName = uuid();
          const filePath = `uploads/${user.id}/${fileName}`;
          if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true });
          }
          req.body.fileName = fileName;
          cb(null, filePath);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('no file');
    }

    return file;
  }
}
