import { ReadStream } from 'fs';
import { FileGroup } from '../../../../core/graphql/schema';

export interface StorageService {
  upload(
    createReadStream: () => ReadStream,
    fileName: string,
    extension: string,
    fileGroup: FileGroup,
    userId: string,
  );
}
