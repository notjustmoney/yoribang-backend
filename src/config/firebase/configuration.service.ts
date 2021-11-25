import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseConfigService {
  constructor(private configService: ConfigService) {}

  get googleApplicationCredential(): any {
    const serviceAccountPath = path.join(
      process.env.PWD,
      this.configService.get('firebase.googleApplicationCredential') as string,
    );
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const serviceAccount = require(serviceAccountPath);
    return serviceAccount;
  }
}
