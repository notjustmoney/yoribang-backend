import { Algorithm } from 'jsonwebtoken';

export interface JwtPayload {
  alg: Algorithm;
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  uid: string;
  claims: any;
}
