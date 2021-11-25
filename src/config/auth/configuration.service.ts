import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class AuthConfigService {
  private serviceAccount;

  constructor(private configService: ConfigService) {
    const serviceAccountPath = path.join(
      process.env.PWD,
      this.configService.get('firebase.googleApplicationCredential') as string,
    );
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.serviceAccount = require(serviceAccountPath);
  }

  get jwtConfig(): JwtModuleOptions {
    return {
      privateKey: this.privateKey,
      publicKey: this.publicKey,
      signOptions: {
        algorithm: 'RS256',
        issuer: this.serviceAccount.client_email,
        subject: this.serviceAccount.client_email,
        expiresIn: '30d',
        audience:
          'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit',
      },
    };
  }

  get privateKey(): string {
    return this.serviceAccount.private_key;
  }

  get publicKey(): string {
    return `-----BEGIN RSA PUBLIC KEY-----
    MIIBCgKCAQEAw4Fv90421tXupTNNgS9XboiALaQH9W7Gge1fmkTMbGjDVKYM61Gm
    GjAP4a1Io8ItnpMorUh/oe3zDhLoCrcPvq6hSPWBEQlFVWHme4fyoL2PTYzvJmOA
    795NG3eQV8Wk3/NvF/tFr7FKeq+7p1Dje4NQQtolnCJlpzMPDPkI9HT0I9CSIe5P
    2I7+QasA9Z097eLIiFmMkKJ67fdLbkS2VnQH63fc8yOKGPQ9MEXmAu80a8h/25ZI
    AQMHz4D5XQ5/IvMc3FnmCrXehezYUY3yfo60EV4XRAMRLksPxx1G29LZ8DOA3gLg
    WKaFgkdFU5hY+59NGfjMKUyEbZ6WfShO+QIDAQAB
    -----END RSA PUBLIC KEY-----
    `;
  }
}
