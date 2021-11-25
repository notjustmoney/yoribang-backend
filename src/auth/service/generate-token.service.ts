import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthConfigService } from '../../config/auth/configuration.service';

@Injectable()
export class GenerateTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authConfig: AuthConfigService,
  ) {}

  async generateToken(uid: string) {
    const payload = { uid };
    return this.jwtService.sign(payload, {
      privateKey: this.authConfig.privateKey,
    });
  }
}
