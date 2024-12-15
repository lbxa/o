/* eslint-disable @stylistic/js/max-len */
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";

import { ChallengeActivityResultsService } from "../challenge/challenge-activity-results";
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

  @Mutation("userDeclineFriendship")
  async declineFriendship(
    @CurrentUser("userId") userId: number,
    @Args("friendId") friendId: string
  ) {
    const decodedId = validateAndDecodeGlobalId(friendId, "User");
    return this.userFriendshipsService.declineFriendship(userId, decodedId);
  }

  @Mutation("userRemoveFriendship")
  async removeFriendship(
    @CurrentUser("userId") userId: number,
    @Args("friendId") friendId: string
  ) {
    const decodedId = validateAndDecodeGlobalId(friendId, "User");
    return this.userFriendshipsService.removeFriendship(userId, decodedId);
  }

  @ResolveField("followers")
  async followers(
    @Parent() user: User,
    @Args() args: ConnectionArgs
  ): Promise<UserConnection> {
    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    return this.userFriendshipsService.getFollowers(decodedUserId, args);
  }

  @ResolveField("following")
  async following(
    @Parent() user: User,
    @Args() args: ConnectionArgs
  ): Promise<UserConnection> {
    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    return this.userFriendshipsService.getFollowing(decodedUserId, args);
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
  buddyCount(@Parent() user: User) {
    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    return this.userFriendshipsService.getBuddyCount(decodedUserId);
  }

  @ResolveField("followerCount")
  followerCount(@Parent() user: User) {
    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    return this.userFriendshipsService.getFollowerCount(decodedUserId);
  }

  @ResolveField("followingCount")
  followingCount(@Parent() user: User) {
    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    return this.userFriendshipsService.getFollowingCount(decodedUserId);
  }

  @ResolveField("challengeActivityResultsCount")
  async challengeActivityResultsCount(@Parent() user: User) {
    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    return this.challengeActivityResultsService.getCount(decodedUserId);
  }

  @ResolveField("followerRequests")
  async followerRequests(@Parent() user: User, @Args() args: ConnectionArgs) {
    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    return this.userFriendshipsService.getFriendships(
      decodedUserId,
      InvitationStatus.PENDING,
      "incoming",
      args
    );
  }

  @ResolveField("followRequests")
  async followRequests(@Parent() user: User, @Args() args: ConnectionArgs) {
    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    return this.userFriendshipsService.getFriendships(
      decodedUserId,
      InvitationStatus.PENDING,
      "outgoing",
      args
    );
  }
}
