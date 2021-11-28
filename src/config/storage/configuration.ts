import { registerAs } from '@nestjs/config';

export default registerAs('storage', () => ({
  host: process.env.STORAGE_HOST,
  port: process.env.STORAGE_PORT,
  protocol: process.env.STORAGE_PROTOCOL,
}));
