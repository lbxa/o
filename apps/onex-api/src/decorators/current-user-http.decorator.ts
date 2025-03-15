import type { ExecutionContext } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common";
import type { Request } from "express";

import type { JwtPayloadWithRefreshToken } from "../auth/refresh-token.strategy";

/**
 * Decorator to extract the current user from HTTP requests
 * Similar to CurrentUser but for non-GraphQL requests
 *
 * @example
 * @Get('profile')
 * @UseGuards(JwtAuthGuard)
 * getProfile(@CurrentUserHttp() userId: number) {
 *   return this.userService.findById(userId);
 * }
 *
 * @example with specific field
 * @Get('profile')
 * @UseGuards(JwtAuthGuard)
 * getProfile(@CurrentUserHttp('email') email: string) {
 *   return this.userService.findByEmail(email);
 * }
 */
export const CurrentUserHttp = createParamDecorator(
  (
    data: keyof JwtPayloadWithRefreshToken | undefined,
    context: ExecutionContext
  ) => {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as JwtPayloadWithRefreshToken;

    if (!user) {
      return null;
    }

    if (data) {
      return user[data];
    }

    return user.userId;
  }
);
