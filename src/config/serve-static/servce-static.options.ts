import * as path from 'path';
import { ServeStaticModuleOptionsFactory } from '@nestjs/serve-static';

export class ServeStaticConfigService
  implements ServeStaticModuleOptionsFactory
{
  createLoggerOptions() {
    return [
      {
        rootPath: path.join(process.env.PWD, 'uploads'),
        serveRoot: '/uploads',
      },
    ];
  }
}
