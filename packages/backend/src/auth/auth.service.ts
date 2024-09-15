import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { and, eq, isNotNull } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { User, users } from "../db/schema";
import { AuthCreateUserInput, AuthCreateUserResponse } from "../types/graphql";
import { UsersService } from "../users/users.service";
import { CryptoService } from "../utils";

@Injectable()
export class AuthService {
  constructor(
    private cryptoService: CryptoService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService,
    private dbService: DbService
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async createNewUser(
    newUserInput: AuthCreateUserInput
  ): Promise<AuthCreateUserResponse | undefined> {
    const newUser = await this.usersService.createUser(newUserInput);

    if (!newUser.id) {
      return undefined;
    }

    const { accessToken, refreshToken } = this.createSignedTokenPair(
      newUser.id,
      newUserInput.email
    );

    await this.updateRefreshToken(newUser.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: { id: newUser.id.toString(), email: newUserInput.email },
    };
  }

  async validateUser(
    email: string
  ): Promise<Pick<User, "id" | "password"> | undefined> {
    const userData = await this.dbService.db
      .select({ id: users.id, password: users.password })
      .from(users)
      .where(eq(users.email, email));

    if (!userData[0]) {
      return undefined;
    }

    return userData[0];
  }

  createSignedTokenPair(userId: number, email: string) {
    const secret = this.configService.get<string>("SECRET");
    const accessToken = this.jwtService.sign(
      {
        userId,
        email,
      },
      { expiresIn: "1hr", secret }
    );
    const refreshToken = this.jwtService.sign(
      {
        userId,
        email,
        accessToken,
      },
      { expiresIn: "7d", secret }
    );
    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken =
      await this.cryptoService.generateArgonHash(refreshToken);

    return await this.dbService.db
      .update(users)
      .set({
        refreshToken: hashedRefreshToken,
      })
      .where(eq(users.id, userId));
  }

  async invalidateRefreshToken(userId: number): Promise<boolean> {
    const [query] = await this.dbService.db
      .update(users)
      .set({ refreshToken: null })
      .where(and(eq(users.id, userId), isNotNull(users.refreshToken)));

    return query.affectedRows > 0;
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.dbService.db
      .select({ refreshToken: users.refreshToken })
      .from(users)
      .where(and(eq(users.id, userId), isNotNull(users.refreshToken)));

    /**
     * If the user has no active refreshToken, this could have
     * happened due to a logout event. Restrict access.
     */
    if (!user[0]?.refreshToken) {
      this.logger.error("Refresh token fetch from database did not work");
      throw new UnauthorizedException(
        "Access Denied: Refresh token is missing or invalid"
      );
    }

    const storedRefreshToken = user[0].refreshToken;

    const match = await this.cryptoService.verifyArgonHash(
      storedRefreshToken,
      refreshToken
    );

    return match;
  }

  async createNewTokens(
    userId: number,
    userEmail: string,
    refreshToken: string
  ) {
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
