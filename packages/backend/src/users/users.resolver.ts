import { ParseIntPipe, UseFilters } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";

import { CommunitiesService } from "../communities/communities.service";
import { Public } from "../decorators";
import { HttpExceptionFilter } from "../error";
import { Community, User, UserUpdateInput } from "../types/graphql";
import { validateAndDecodeGlobalId } from "../utils";
import { UsersService } from "./users.service";

@Resolver("User")
@UseFilters(HttpExceptionFilter)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly communitiesService: CommunitiesService
  ) {}

  @Query("users")
  getUsers() {
    return this.usersService.findAll();
  }

  // TODO actually implement this
  @ResolveField()
  async friends(@Parent() user: User): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ResolveField()
  async communities(@Parent() user: User): Promise<Community[]> {
    const userId = validateAndDecodeGlobalId(user.id, "User");
    return this.communitiesService.findUserCommunities(userId);
  }

  // TODO implement this
  @ResolveField()
  async searchFriends(@Args("searchTerm") searchTerm: string): Promise<User[]> {
    if (!searchTerm) {
      return this.usersService.findAll();
    }
    return this.usersService.userSearch(searchTerm);
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

  @Query("userSearch")
  userSearch(@Args("searchTerm") searchTerm: string) {
    return this.usersService.userSearch(searchTerm);
  }

  // @Mutation('removeUser')
  // remove(@Args('id') id: number) {
  //   console.log("Deletedk");
  //   return this.usersService.remove(id);
  // }
}
