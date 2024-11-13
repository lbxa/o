import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { UserModule } from "../user/user.module";
import { CryptoService } from "../utils";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { RefreshTokenStrategy } from "./refresh-token.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        refreshTokenSecret: configService.getOrThrow<string>(
          "ACCESS_TOKEN_SECRET"
        ),
        accessTokenSecret: configService.getOrThrow<string>(
          "REFRESH_TOKEN_SECRET"
        ),
        signOptions: { expiresIn: "60s" },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    CryptoService,
    LocalStrategy,
    RefreshTokenStrategy,
    JwtStrategy,
    JwtService,
  ],
  exports: [JwtStrategy, JwtModule, CryptoService],
})
export class AuthModule {}
