import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UsersTable } from "@o/db";
import * as schema from "@o/db";
import { and, eq, isNotNull } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { AuthCreateUserInput, AuthCreateUserPayload } from "../types/graphql";
import { UserService } from "../user/user.service";
import { CryptoService } from "../utils";
import { ConflictError, InternalServerError } from "../utils/errors";

@Injectable()
export class AuthService {
  constructor(
    private cryptoService: CryptoService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
    private dbService: DbService<typeof schema>
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async registerUser(
    newUserInput: AuthCreateUserInput
  ): Promise<AuthCreateUserPayload | undefined> {
    const existingUser = await this.userService.findByEmail(newUserInput.email);

    if (existingUser) {
      throw new ConflictError("Email already taken");
    }

    const newUser = await this.userService.create(newUserInput);

    if (!newUser.id) {
      throw new InternalServerError(
        "User creation failed: Unable to generate new user account.",
        { customerSupport: true }
      );
    }

    const { accessToken, refreshToken } = this.createSignedTokenPair(
      newUser.id,
      newUserInput.email
    );

    const updated = await this.updateRefreshToken(newUser.id, refreshToken);

    if (!updated) {
      throw new InternalServerError(
        "Unable to update refresh token for new user account.",
        { customerSupport: true }
      );
    }

    return {
      tokens: {
        accessToken,
        refreshToken,
      },
      user: this.userService.pg2GqlMapper(newUser),
    };
  }

  createSignedTokenPair(userId: number, email: string) {
    const accessTokenSecret = this.configService.getOrThrow<string>(
      "ACCESS_TOKEN_SECRET"
    );
    const refreshTokenSecret = this.configService.getOrThrow<string>(
      "REFRESH_TOKEN_SECRET"
    );

    const accessToken = this.jwtService.sign(
      {
        userId,
        email,
      },
      { expiresIn: "1hr", secret: accessTokenSecret }
    );
    const refreshToken = this.jwtService.sign(
      {
        userId,
        email,
        accessToken,
      },
      { expiresIn: "30d", secret: refreshTokenSecret }
    );
    return { accessToken, refreshToken };
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string
  ): Promise<boolean> {
    const hashedRefreshToken =
      await this.cryptoService.generateArgonHash(refreshToken);

    const result = await this.dbService.db
      .update(UsersTable)
      .set({
        refreshToken: hashedRefreshToken,
      })
      .where(eq(UsersTable.id, userId));

    return !!result.rowCount;
  }

  async invalidateRefreshToken(userId: number): Promise<boolean> {
    const result = await this.dbService.db
      .update(UsersTable)
      .set({ refreshToken: null })
      .where(
        and(eq(UsersTable.id, userId), isNotNull(UsersTable.refreshToken))
      );

    return !!result.rowCount;
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.dbService.db.query.UsersTable.findFirst({
      where: and(eq(UsersTable.id, userId), isNotNull(UsersTable.refreshToken)),
      columns: {
        refreshToken: true,
      },
    });

    /**
     * If the user has no active refreshToken, this could have
     * happened due to a logout event. Restrict access.
     */
    if (!user?.refreshToken) {
      this.logger.error("Error fetching refresh token from the database");
      throw new UnauthorizedException(
        "Access Denied: Refresh token is missing or invalid"
      );
    }

    const storedRefreshToken = user.refreshToken;

    const match = await this.cryptoService.verifyArgonHash(
      storedRefreshToken,
      refreshToken
    );

    return match;
  }

  async refreshTokens(userId: number, userEmail: string, refreshToken: string) {
    const validToken = await this.validateRefreshToken(userId, refreshToken);
    if (!validToken) {
      throw new UnauthorizedException(
        "Access Denied: Refresh token is missing or invalid"
      );
    }

    const { accessToken, refreshToken: newRefreshToken } =
      this.createSignedTokenPair(userId, userEmail);

    await this.updateRefreshToken(userId, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  }
}
