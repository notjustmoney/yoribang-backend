import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (request.originalUrl === '/graphql') {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req.user;
    }
    return request.user;
  },
);
