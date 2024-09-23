import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import { AuthService } from "./auth.service";
import { JwtPayload } from "./jwt.strategy";

export type JwtPayloadWithRefreshToken = JwtPayload & {
  refreshToken: string;
};

/**
 * Corresponds to the guard in refresh-token.guard.ts
 */
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "refresh-token"
) {
  constructor(
    public configService: ConfigService,
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: configService.getOrThrow<string>("SECRET"),
    });
  }

  async validate(
    req: Request,
    payload: JwtPayload
  ): Promise<JwtPayloadWithRefreshToken> {
    const refreshToken = req.get("Authorization")?.replace("Bearer", "").trim();

    if (!refreshToken) {
      throw new UnauthorizedException(
        "Access Denied: Refresh token is missing or invalid"
      );
    }

    const validToken = await this.authService.validateRefreshToken(
      payload.userId,
      refreshToken
    );

    if (!validToken) {
      throw new UnauthorizedException(
        "Access Denied: Refresh token is missing or invalid"
      );
    }

    return {
      ...payload,
      refreshToken: refreshToken,
    };
  }
}
