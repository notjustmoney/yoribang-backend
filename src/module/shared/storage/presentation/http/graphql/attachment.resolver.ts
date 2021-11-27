import { UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Resolver,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Attachment, User } from '@prisma/client';
import { CurrentUser } from '@auth/decorator/current-user.decorator';
import { JwtAuthGuard } from '@auth/guard/jwt-auth.guard';
import { FileGroup, FileUploadInput } from '@core/graphql/schema';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { LocalStorageSerivce } from '../../../service/local-storage.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Resolver('Attachment')
export class StorageResolver {
  constructor(private readonly storageService: LocalStorageSerivce) {}

  @Mutation('uploadFile')
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
    @Args('group') group: FileGroup,
    // @CurrentUser() user: User,
  ) {
    console.log(filename);
    return {
      id: '1243',
    };
    // const output = await this.storageService.upload(
    //   createReadStream,
    //   filename,
    //   mimetype,
    //   group,
    //   user.id,
    // );
    // console.log('output');
    // return output;
  }

  @ResolveField('url')
  async calcUrl(@Parent() file: Attachment) {
    return 'https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTNfMTI1/MDAxNTg5MzY2OTY2ODEx.O9qlhMAd8uqKZyojJKH9l0WGTjP9LLKlvWOhyrjYFDwg.W7B1J2M2OM-TAqZrj3d-ciyKUWyj7eEPBKg2UfVYcW8g.JPEG.eett7777/IMG_6150.jpg?type=w800';
  }
}
