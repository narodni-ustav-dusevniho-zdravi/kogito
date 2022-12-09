import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '@app/user/user.entity';

export const CurrentUser = createParamDecorator<any, any, User>(
  (data: unknown, context: ExecutionContext): User => {
    const ctx = GqlExecutionContext.create(context).getContext();

    return ctx.req && ctx.req.user;
  },
);
