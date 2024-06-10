import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersResolver } from "./users.resolver";
import { PasswordService } from "../utils";

@Module({
  providers: [UsersResolver, UsersService, PasswordService],
})
export class UsersModule {}
