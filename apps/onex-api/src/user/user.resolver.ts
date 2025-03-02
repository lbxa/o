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
  ImageQuality,
  InvitationStatus,
  User,
  UserConnection,
  UserFriendshipStatus,
  UserUpdateInput,
} from "../types/graphql";
import { ConnectionArgs, validateAndDecodeGlobalId } from "../utils";
import { decodeGlobalId } from "../utils";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserFriendshipService } from "./user-friendship/user-friendship.service";
import { UserStreaksService } from "./user-streaks";
@Resolver("User")
export class UserResolver {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly userFriendshipService: UserFriendshipService,
    private readonly userStreaksService: UserStreaksService,
    private readonly challengeActivityResultsService: ChallengeActivityResultsService
  ) {}

  @ResolveField("avatarUrl")
  async avatarUrl(
    @Parent() user: User,
    @Args("quality") quality: ImageQuality = ImageQuality.MED
  ): Promise<string | null> {
    if (!user.avatarUrl) {
      return null;
    }

    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    const userData = await this.userRepository.findById(decodedUserId);

    if (!userData?.avatarUrl) {
      return null;
    }

    switch (quality) {
      case ImageQuality.LOW:
        return userData.avatarUrl.low;
      case ImageQuality.HIGH:
        return userData.avatarUrl.high;
      case ImageQuality.MED:
      default:
        return userData.avatarUrl.med;
    }
  }

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
    return this.userFriendshipService.requestFriendship(
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
    return this.userFriendshipService.acceptFriendship(userId, decodedFriendId);
  }

  @Mutation("userDeclineFriendship")
  async declineFriendship(
    @CurrentUser("userId") userId: number,
    @Args("friendId") friendId: string
  ) {
    const decodedId = validateAndDecodeGlobalId(friendId, "User");
    return this.userFriendshipService.declineFriendship(userId, decodedId);
  }

  @Mutation("userRemoveFriendship")
  async removeFriendship(
    @CurrentUser("userId") userId: number,
    @Args("friendId") friendId: string
  ) {
    const decodedId = validateAndDecodeGlobalId(friendId, "User");
    return this.userFriendshipService.removeFriendship(userId, decodedId);
  }

  @ResolveField("streak")
  async streak(@Parent() user: User) {
    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    return this.userStreaksService.findByUserId(decodedUserId);
  }

  @ResolveField("followers")
  async followers(
    @Parent() user: User,
    @Args() args: ConnectionArgs
  ): Promise<UserConnection> {
    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    return this.userFriendshipService.getFollowers(decodedUserId, args);
  }

  @ResolveField("following")
  async following(
    @Parent() user: User,
    @Args() args: ConnectionArgs
  ): Promise<UserConnection> {
    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    return this.userFriendshipService.getFollowing(decodedUserId, args);
  }

  @Query("getFriendshipStatus")
  async getFriendshipStatus(
    @Args("userId") userId: string,
    @Args("friendId") friendId: string
  ): Promise<UserFriendshipStatus> {
    const decodedUserId = validateAndDecodeGlobalId(userId, "User");
    const decodedFriendId = validateAndDecodeGlobalId(friendId, "User");

    const { outgoing, incoming } =
      await this.userFriendshipService.getFriendship(
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
    return this.userFriendshipService.getBuddyCount(decodedUserId);
  }

  @ResolveField("followerCount")
  followerCount(@Parent() user: User) {
    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    return this.userFriendshipService.getFollowerCount(decodedUserId);
  }

  @ResolveField("followingCount")
  followingCount(@Parent() user: User) {
    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    return this.userFriendshipService.getFollowingCount(decodedUserId);
  }

  @ResolveField("challengeActivityResultsCount")
  async challengeActivityResultsCount(@Parent() user: User) {
    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    return this.challengeActivityResultsService.getCount(decodedUserId);
  }

  @ResolveField("followerRequests")
  async followerRequests(@Parent() user: User, @Args() args: ConnectionArgs) {
    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    return this.userFriendshipService.getFriendships(
      decodedUserId,
      InvitationStatus.PENDING,
      "incoming",
      args
    );
  }

  @ResolveField("followRequests")
  async followRequests(@Parent() user: User, @Args() args: ConnectionArgs) {
    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    return this.userFriendshipService.getFriendships(
      decodedUserId,
      InvitationStatus.PENDING,
      "outgoing",
      args
    );
  }

  @ResolveField("firstMutualFriend")
  async firstMutualFriend(
    @Parent() user: User,
    @CurrentUser("userId") viewerId: number,
    @Args("friendId") friendId?: string
  ): Promise<User | undefined> {
    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    let decodedFriendId: number;
    if (friendId) {
      decodedFriendId = validateAndDecodeGlobalId(friendId, "User");
    } else {
      decodedFriendId = viewerId;
    }

    const mutuals = await this.userFriendshipService.getMutualFollowing(
      decodedUserId,
      decodedFriendId
    );

    return mutuals[0];
  }

  @ResolveField("secondMutualFriend")
  async secondMutualFriend(
    @Parent() user: User,
    @CurrentUser("userId") viewerId: number,
    @Args("friendId") friendId?: string
  ): Promise<User | undefined> {
    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    let decodedFriendId: number;
    if (friendId) {
      decodedFriendId = validateAndDecodeGlobalId(friendId, "User");
    } else {
      decodedFriendId = viewerId;
    }

    const mutuals = await this.userFriendshipService.getMutualFollowing(
      decodedUserId,
      decodedFriendId
    );

    return mutuals[1];
  }

  @ResolveField("mutualCount")
  async mutualCount(
    @Parent() user: User,
    @CurrentUser("userId") viewerId: number,
    @Args("friendId") friendId?: string
  ): Promise<number> {
    const decodedUserId = validateAndDecodeGlobalId(user.id, "User");
    let decodedFriendId: number;
    if (friendId) {
      decodedFriendId = validateAndDecodeGlobalId(friendId, "User");
    } else {
      decodedFriendId = viewerId;
    }

    return this.userFriendshipService.getMutualFollowingCount(
      decodedUserId,
      decodedFriendId
    );
  }
}
