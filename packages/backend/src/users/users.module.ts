import { Module } from "@nestjs/common";

import { PasswordService } from "../utils";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  providers: [UsersResolver, UsersService, PasswordService],
})
export class UsersModule {}
