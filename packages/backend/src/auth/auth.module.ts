import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { CryptoService } from "../utils";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { RefreshTokenStrategy } from "./refresh-token.strategy";

@Module({
  imports: [
    UsersModule,
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
    UsersService,
    LocalStrategy,
    RefreshTokenStrategy,
    JwtStrategy,
    JwtService,
  ],
  exports: [JwtStrategy, JwtModule],
})
export class AuthModule {}
