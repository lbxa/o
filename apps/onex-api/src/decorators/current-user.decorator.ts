import type { ExecutionContext } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

import type { JwtPayloadWithRefreshToken } from "../auth/refresh-token.strategy";
import type { GqlContext } from "../types/globals";

export const CurrentUser = createParamDecorator(
  (
    data: keyof JwtPayloadWithRefreshToken | undefined,
    context: ExecutionContext
  ) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext<GqlContext>().req;
    const user = req.user as JwtPayloadWithRefreshToken;
    if (data) {
      return user[data];
    }

    return user.userId;
  }
);
