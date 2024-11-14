import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";

import { CommunityService } from "../community/community.service";
import { Public } from "../decorators";
import { Community, User, UserUpdateInput } from "../types/graphql";
import { validateAndDecodeGlobalId } from "../utils";
import { UserService } from "./user.service";

@Resolver("User")
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly communityService: CommunityService
  ) {}

  @Query("users")
  getUsers() {
    return this.userService.findAll();
  }

  // TODO actually implement this
  @ResolveField()
  async friends(@Parent() user: User): Promise<User[]> {
    return this.userService.findAll();
  }

  @ResolveField()
  async communities(@Parent() user: User): Promise<Community[]> {
    const userId = validateAndDecodeGlobalId(user.id, "User");
    return this.communityService.findUserCommunities(userId);
  }

  // TODO implement this
  @ResolveField()
  async searchFriends(@Args("searchTerm") searchTerm: string): Promise<User[]> {
    if (!searchTerm) {
      return this.userService.findAll();
    }
    return this.userService.userSearch(searchTerm);
  }

  @Public()
  @Query("userValidateEmail")
  async validateEmail(@Args("email") email: string) {
    return { alreadyTaken: !!(await this.userService.findByEmail(email)) };
  }

  @Mutation("userUpdate")
  update(@Args("userUpdateInput") userUpdateInput: UserUpdateInput) {
    return this.userService.update(userUpdateInput);
  }

  @Query("userSearch")
  userSearch(@Args("searchTerm") searchTerm: string) {
    return this.userService.userSearch(searchTerm);
  }

  // @Mutation('removeUser')
  // remove(@Args('id') id: number) {
  //   console.log("Deletedk");
  //   return this.userService.remove(id);
  // }
}