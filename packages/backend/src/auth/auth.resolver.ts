import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UserLoginInput } from "../types/graphql";

@Resolver("Auth")
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation("login")
  login(@Args("userLoginInput") credentials: UserLoginInput) {
    const { email, password } = credentials;

    return this.authService.signIn(email, password);
  }
}
