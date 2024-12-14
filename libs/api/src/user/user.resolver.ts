/* eslint-disable @stylistic/js/max-len */
import { Args, Mutation, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { ChallengeActivityResultsService } from "../challenge/challenge-activity-results";
import { CommunityService } from "../community/community.service";
import { Public } from "../decorators";
import { CurrentUser } from "../decorators/current-user.decorator";
import {
  InvitationStatus,
  User,
  UserConnection,
  UserFriendshipStatus,
  UserUpdateInput,
} from "../types/graphql";
import { ConnectionArgs, validateAndDecodeGlobalId } from "../utils";
import { decodeGlobalId } from "../utils";
import { UserService } from "./user.service";
import { UserFriendshipsService } from "./user-friendships/user-friendships.service";

@Resolver("User")
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly communityService: CommunityService,
    private readonly userFriendshipsService: UserFriendshipsService,
    private readonly challengeActivityResultsService: ChallengeActivityResultsService
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

  @Mutation("userRemoveFriendship")
  async removeFriendship(
    @CurrentUser("userId") userId: number,
    @Args("friendId") friendId: string
  ) {
    const decodedId = validateAndDecodeGlobalId(friendId, "User");
    return this.userFriendshipsService.removeFriendship(userId, decodedId);
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

  @Query("getFriendshipStatus")
  async getFriendshipStatus(
    @Args("userId") userId: string,
    @Args("friendId") friendId: string
  ): Promise<UserFriendshipStatus> {
    const decodedUserId = validateAndDecodeGlobalId(userId, "User");
    const decodedFriendId = validateAndDecodeGlobalId(friendId, "User");

    const { outgoing, incoming } =
      await this.userFriendshipsService.getFriendship(
        decodedUserId,
        decodedFriendId
      );

    return {
      __typename: "UserFriendshipStatus",
      outgoing,
      incoming,
      areMutualFriends:
        outgoing?.status === InvitationStatus.ACCEPTED &&
        incoming?.status === InvitationStatus.ACCEPTED,
    };
  }

  @Query("userProfile")
  async userProfile(@Args("id") id: string) {
    const { id: decodedUserId } = decodeGlobalId(id);
    return this.userService.findById(decodedUserId);
  }

  @ResolveField("buddyCount")
  buddyCount(@CurrentUser("userId") userId: number) {
    return this.userFriendshipsService.getBuddyCount(userId);
  }

  @ResolveField("followerCount")
  followerCount(@CurrentUser("userId") userId: number) {
    return this.userFriendshipsService.getFollowerCount(userId);
  }

  @ResolveField("followingCount")
  followingCount(@CurrentUser("userId") userId: number) {
    return this.userFriendshipsService.getFollowingCount(userId);
  }

  @ResolveField("challengeActivityResultsCount")
  async challengeActivityResultsCount(@CurrentUser("userId") userId: number) {
    return this.challengeActivityResultsService.getCount(userId);
  }

  // @Mutation('removeUser')
  // remove(@Args('id') id: number) {
  //   console.log("Deletedk");
  //   return this.userService.remove(id);
  // }
}
