import { ParseIntPipe, UseFilters } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { HttpExceptionFilter } from "../error";
import { CreateUserInput, UpdateUserInput } from "../types/graphql";
import { UsersService } from "./users.service";

@Resolver("User")
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation("createUser")
  @UseFilters(HttpExceptionFilter)
  create(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query("user")
  getUser(@Args("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation("updateUser")
  update(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
    console.log("Updated");
    return this.usersService.update(updateUserInput);
  }

  // @Mutation('removeUser')
  // remove(@Args('id') id: number) {
  //   console.log("Deletedk");
  //   return this.usersService.remove(id);
  // }
}
