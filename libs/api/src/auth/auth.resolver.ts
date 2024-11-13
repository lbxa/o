import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { Public } from "../decorators";
import { CurrentUser } from "../decorators/current-user.decorator";
import { RefreshTokenGuard } from "../guards/refresh-token.guard";
import { AuthCreateUserInput, AuthLoginInput, Tokens } from "../types/graphql";
import { UserService } from "../user/user.service";
import { CryptoService } from "../utils";
import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/errors";
import { AuthService } from "./auth.service";

@Resolver("Auth")
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cryptoService: CryptoService
  ) {}

  @Public()
  @Mutation("authLogin")
  async login(@Args("authLoginInput") authLoginInput: AuthLoginInput) {
    const user = await this.userService.findByEmail(authLoginInput.email);

    if (!user) {
      throw new NotFoundError("Invalid or incorrect email");
    }

    const match = await this.cryptoService.verifyArgonHash(
      user.password,
      authLoginInput.password
    );

    if (!match) {
      throw new UnauthorizedError("Password is incorrect");
    }

    const { accessToken, refreshToken } =
      this.authService.createSignedTokenPair(user.id, authLoginInput.email);

    const updated = await this.authService.updateRefreshToken(
      user.id,
      refreshToken
    );

    if (!updated) {
      throw new InternalServerError(
        [
          "Unable to update refresh token for user account.",
          "Please try again or contact support if the issue persists.",
        ].join(" ")
      );
    }

    return {
      tokens: {
        accessToken,
        refreshToken,
      },
      user,
    };
  }

  @Public()
  @Mutation("authCreateUser")
  create(
    @Args("authCreateUserInput") authCreateUserInput: AuthCreateUserInput
  ) {
    return this.authService.registerUser(authCreateUserInput);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation("authRefreshTokens")
  async refreshTokens(
    @CurrentUser("userId") userId: number,
    @CurrentUser("email") userEmail: string,
    @CurrentUser("refreshToken") refreshToken: string
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, userEmail, refreshToken);
  }

  @Mutation("authLogout")
  async logout(@Args("id") id: number) {
    const loggedOut = await this.authService.invalidateRefreshToken(id);
    return loggedOut;
  }
}
