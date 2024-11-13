import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { Public } from "../decorators";
import { CurrentUser } from "../decorators/current-user.decorator";
import { NotFoundError, UnauthorizedError } from "../errors";
import { RefreshTokenGuard } from "../guards/refresh-token.guard";
import { AuthCreateUserInput, AuthLoginInput, Tokens } from "../types/graphql";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";

@Resolver("Auth")
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Public()
  @Mutation("authLogin")
  async login(@Args("authLoginInput") authLoginInput: AuthLoginInput) {
    const user = await this.userService.findByEmail(authLoginInput.email);

    if (!user) {
      throw new NotFoundError("User with this email does not exist");
    }

    // const match = await this.cryptoService.verifyArgonHash(
    //   hashedPassword, // absolute hack atm! need to fix this
    //   password
    // );

    const match = user.password === authLoginInput.password; // TODO fix this asap

    if (!match) {
      throw new UnauthorizedError("Password is incorrect");
    }

    const { accessToken, refreshToken } =
      this.authService.createSignedTokenPair(user.id, authLoginInput.email);

    await this.authService.updateRefreshToken(user.id, refreshToken);

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
    return this.authService.createNewUser(authCreateUserInput);
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
