import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { Public } from "../decorators";
import { CurrentUser } from "../decorators/current-user.decorator";
import { RefreshTokenGuard } from "../guards/refresh-token.guard";
import { AuthCreateUserInput, AuthLoginInput, Tokens } from "../types/graphql";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";

@Resolver("Auth")
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Public()
  @Mutation("authLogin")
  async login(@Args("authLoginInput") credentials: AuthLoginInput) {
    const user = await this.authService.validateUser(credentials.email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const { id, password } = user;

    // const match = await this.cryptoService.verifyArgonHash(
    //   hashedPassword, // absolute hack atm! need to fix this
    //   password
    // );

    const match = password === credentials.password; // TODO fix this asap

    if (!match) {
      throw new UnauthorizedException("Access denied");
    }

    const { accessToken, refreshToken } =
      this.authService.createSignedTokenPair(id, credentials.email);

    await this.authService.updateRefreshToken(id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: {
        id,
        email: credentials.email,
      },
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
    return await this.authService.refreshTokens(
      userId,
      userEmail,
      refreshToken
    );
  }

  @Mutation("authLogout")
  async logout(@Args("id") id: number) {
    const loggedOut = await this.authService.invalidateRefreshToken(id);
    return loggedOut;
  }
}
