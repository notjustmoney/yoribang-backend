export class StorageUtil {
  public static getFileType(file: Express.Multer.File) {
    return file.mimetype.split('/')[0];
  }

  public static getFileSubType(file: Express.Multer.File) {
    return file.mimetype.split('/')[1];
  }

  public static getFileExtension(file: Express.Multer.File) {
    const splited = file.originalname.split('.');
    return splited[splited.length - 1];
  }

  public static filterExtensionFromOriginalName(file: Express.Multer.File) {
    const splited = file.originalname.split('.');
    if (splited.length > 1) {
      splited.splice(-1);
    }
    return splited.join('.');
  }

  public static filterExtensionFromFileName(file: Express.Multer.File) {
    const splited = file.filename.split('.');
    if (splited.length > 1) {
      splited.splice(-1);
    }
    console.log(splited);
    return splited.join('.');
  }

  public static filterFileNameFromFilePath(file: Express.Multer.File) {
    if (file.path.includes('uploads/')) {
      file.path.replace('uploads/', '');
    }
    const splited = file.path.split('/');
    if (splited.length > 1) {
      splited.splice(-1);
    }
    return splited.join('/');
  }
}
