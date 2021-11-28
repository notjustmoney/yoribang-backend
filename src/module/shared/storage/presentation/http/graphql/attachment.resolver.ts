import { Resolver, Args, ResolveField, Parent, Query } from '@nestjs/graphql';
import { Attachment } from '@prisma/client';
import { LocalStorageSerivce } from '../../../service/local-storage.service';
import { PrismaService } from '../../../../prisma/prisma.service';

@Resolver('Attachment')
export class StorageResolver {
  constructor(
    private readonly storageService: LocalStorageSerivce,
    private readonly prisma: PrismaService,
  ) {}

  @Query('attachmentById')
  attachmentById(@Args('id') id: string) {
    return this.prisma.attachment.findUnique({ where: { id } });
  }

  @ResolveField('url')
  async calcFileUrl(@Parent() file: Attachment) {
    return this.storageService.calcFileUrl(file);
  }
}
