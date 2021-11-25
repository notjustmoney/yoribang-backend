import { LoginResolver } from './login.resolver';
import { SendVerificationResolver } from './send-verification.resolver';
import { UserResolver } from './user.resolver';

export const USER_RESOLVERS = [
  UserResolver,
  SendVerificationResolver,
  LoginResolver,
];
