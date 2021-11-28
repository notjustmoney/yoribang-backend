import { FileGroup } from '../../../../core/graphql/schema';

export interface StorageService {
  uploadFileInformation(
    file: Express.Multer.File,
    groupName: FileGroup,
    userId: string,
  );
}
