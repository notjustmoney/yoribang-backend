import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageConfigService {
  constructor(private configService: ConfigService) {}

  get protocol(): string {
    return this.configService.get('storage.protocol') as string;
  }

  get host(): string {
    return this.configService.get('storage.host') as string;
  }

  get port(): string {
    return this.configService.get('storage.port') as string;
  }
}
