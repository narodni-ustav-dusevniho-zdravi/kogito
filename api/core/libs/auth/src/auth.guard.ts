import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

@Injectable()
export class GqlAdminAuthGuard extends GqlAuthGuard {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
