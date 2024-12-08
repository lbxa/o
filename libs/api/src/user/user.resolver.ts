import { Args, Mutation, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { CommunityService } from "../community/community.service";
import { Public } from "../decorators";
import { CurrentUser } from "../decorators/current-user.decorator";
import {
  InvitationStatus,
  User,
  UserConnection,
  UserUpdateInput,
} from "../types/graphql";
import { ConnectionArgs } from "../utils";
import { decodeGlobalId } from "../utils";
import { UserService } from "./user.service";
import { UserFriendshipsService } from "./user-friendships/user-friendships.service";

@Resolver("User")
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly communityService: CommunityService,
    private readonly userFriendshipsService: UserFriendshipsService
  ) {}

  @Query("users")
  getUsers() {
    return this.userService.findAll();
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

  @Mutation("userRequestFriendship")
  async requestFriendship(
    @CurrentUser("userId") userId: number,
    @Args("friendId") friendId: string
  ) {
    const { id: decodedFriendId } = decodeGlobalId(friendId);
    return this.userFriendshipsService.requestFriendship(
      userId,
      decodedFriendId
    );
  }

  @Mutation("userAcceptFriendship")
  async acceptFriendship(
    @CurrentUser("userId") userId: number,
    @Args("friendId") friendId: string
  ) {
    const { id: decodedFriendId } = decodeGlobalId(friendId);
    return this.userFriendshipsService.acceptFriendship(
      userId,
      decodedFriendId
    );
  }

  @ResolveField("friendRequests")
  async friendRequests(
    @CurrentUser("userId") userId: number,
    @Args() args: ConnectionArgs
  ) {
    return this.userFriendshipsService.getFriendships(
      userId,
      InvitationStatus.PENDING,
      args
    );
  }

  @ResolveField("friends")
  async friends(
    @CurrentUser("userId") userId: number,
    @Args() args: ConnectionArgs
  ): Promise<UserConnection> {
    return this.userFriendshipsService.getFriends(userId, args);
  }

  @Query("userProfile")
  async userProfile(@Args("id") id: string) {
    const { id: decodedUserId } = decodeGlobalId(id);
    return this.userService.findById(decodedUserId);
  }

  // @Mutation('removeUser')
  // remove(@Args('id') id: number) {
  //   console.log("Deletedk");
  //   return this.userService.remove(id);
  // }
}
