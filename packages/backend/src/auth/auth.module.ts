import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { AuthResolver } from "./auth.resolver";
import { PasswordService } from "../utils";

@Module({
  imports: [UsersModule],
  providers: [AuthResolver, AuthService, PasswordService],
})
export class AuthModule {}
