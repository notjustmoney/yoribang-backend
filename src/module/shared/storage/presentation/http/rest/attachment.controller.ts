import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@auth/guard/jwt-auth.guard';
import { User } from '@prisma/client';
import { CurrentUser } from '@auth/decorator/current-user.decorator';
import { FileGroup } from '@core/graphql/schema';
import { LocalStorageSerivce } from '../../../service/local-storage.service';
import { LocalStorageInterceptor } from '../../../interceptor/local-storage.interceptor';

@Controller()
export class AttachmentController {
  constructor(private readonly storageService: LocalStorageSerivce) {}

  @Post('attachment')
  @UseGuards(JwtAuthGuard)
  @LocalStorageInterceptor()
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('group') group: FileGroup,
    @CurrentUser() user: User,
  ) {
    if (!file) {
      throw new Error('no file');
    }
    return this.storageService.uploadFileInformation(file, group, user.id);
  }
}
