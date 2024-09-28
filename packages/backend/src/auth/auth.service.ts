import {
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User, UsersTable } from "@o/db";
import { and, eq, isNotNull } from "drizzle-orm";

import { DbService } from "../db/db.service";
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
      throw new ForbiddenException("User creation failed");
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
    const user = await this.dbService.db.query.UsersTable.findFirst({
      where: eq(UsersTable.email, email),
      columns: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      throw new ForbiddenException(`User data for ${email} not found`);
    }

    return user;
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

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken =
      await this.cryptoService.generateArgonHash(refreshToken);

    return await this.dbService.db
      .update(UsersTable)
      .set({
        refreshToken: hashedRefreshToken,
      })
      .where(eq(UsersTable.id, userId));
  }

  async invalidateRefreshToken(userId: number): Promise<boolean> {
    const [query] = await this.dbService.db
      .update(UsersTable)
      .set({ refreshToken: null })
      .where(
        and(eq(UsersTable.id, userId), isNotNull(UsersTable.refreshToken))
      );

    return query.affectedRows > 0;
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
