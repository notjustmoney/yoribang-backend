import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { STRATEGY_JWT_AUTH } from '../strategy/jwt-auth.strategy';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard(STRATEGY_JWT_AUTH) {
  getRequest(_ctx: ExecutionContext) {
    const request = _ctx.switchToHttp().getRequest();
    if (request.originalUrl === '/graphql') {
      const ctx = GqlExecutionContext.create(_ctx);
      return ctx.getContext().req;
    }
    return request;
  }
}
