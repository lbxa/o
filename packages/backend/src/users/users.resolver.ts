import { ParseIntPipe, UseFilters } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { Public } from "../decorators";
import { CurrentUser } from "../decorators/current-user.decorator";
import { HttpExceptionFilter } from "../error";
import { User, UserUpdateInput } from "../types/graphql";
import { UsersService } from "./users.service";

@Resolver("User")
@UseFilters(HttpExceptionFilter)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query("user")
  getUser(@Args("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // TODO add currentUser query with regular polling
  @Query("activeUser")
  async activeUser(
    @CurrentUser("userId") userId: number
  ): Promise<User | undefined> {
    return this.usersService.findOne(userId);
  }

  @Public()
  @Query("userValidateEmail")
  validateEmail(@Args("email") email: string) {
    return { alreadyTaken: this.usersService.findByEmail(email) };
  }

  @Mutation("userUpdate")
  update(@Args("userUpdateInput") userUpdateInput: UserUpdateInput) {
    return this.usersService.update(userUpdateInput);
  }

  // @Mutation('removeUser')
  // remove(@Args('id') id: number) {
  //   console.log("Deletedk");
  //   return this.usersService.remove(id);
  // }
}
