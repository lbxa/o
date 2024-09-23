import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export interface JwtPayload {
  email: string;
  userId: number;
}

/**
 * Corresponds to the guard in jwt.guard.ts
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(public configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>("SECRET"),
    });
  }

  /**
   * This strategy extracts out email and userId into the req object
   */
  validate(payload: JwtPayload) {
    return payload;
  }
}
