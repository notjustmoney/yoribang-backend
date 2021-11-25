import { registerAs } from '@nestjs/config';

export default registerAs('firebase', () => ({
  googleApplicationCredential: process.env.GOOGLE_APPLICATION_CREDENTIAL,
}));
