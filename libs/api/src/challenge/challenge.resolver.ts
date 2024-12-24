import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import * as schema from "@o/db";
import { ChallengeActivityResultsTable } from "@o/db";
import { eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { CurrentUser } from "../decorators/current-user.decorator";
import {
  Challenge,
  ChallengeActivityCreateInput,
  ChallengeCreateInput,
  ChallengeCreatePayload,
  ChallengeInvitation,
  ChallengeUpdateInput,
} from "../types/graphql";
import { validateAndDecodeGlobalId } from "../utils";
import { ChallengeService } from "./challenge.service";
import { ChallengeInvitationsService } from "./challenge-invitations";
import { ChallengeMembershipsService } from "./challenge-memberships";

@Resolver("Challenge")
export class ChallengeResolver {
  constructor(
    private challengeService: ChallengeService,
    private challengeInvitationsService: ChallengeInvitationsService,
    private challengeMembershipsService: ChallengeMembershipsService,
    private dbService: DbService<typeof schema>
  ) {}

  @Query("challenge")
  async challenge(@Args("id") id: string): Promise<Challenge> {
    const challengeId = validateAndDecodeGlobalId(id, "Challenge");
    return this.challengeService.findById(challengeId);
  }

  @ResolveField("memberCount")
  async memberCount(@Parent() challenge: Challenge): Promise<number> {
    /**
     * For now this can be calculated by counting the unique users who have
     * completed the challenge activity. Eventually, if communities/challenges
     * get big enough, we can play around with allowing users to join challenges
     */
    const challengeId = validateAndDecodeGlobalId(challenge.id, "Challenge");
    const challengeActivityUniqueUsers = await this.dbService.db
      .selectDistinct({
        userId: ChallengeActivityResultsTable.userId,
      })
      .from(ChallengeActivityResultsTable)
      .where(eq(ChallengeActivityResultsTable.challengeId, challengeId));

    return challengeActivityUniqueUsers.length;
  }

  @Mutation("challengeCreate")
  async challengeCreate(
    @Args("challengeCreateInput") challengeInput: ChallengeCreateInput,
    @Args("challengeActivityCreateInput")
    activityInput: ChallengeActivityCreateInput,
    @CurrentUser("userId") userId: number
  ): Promise<ChallengeCreatePayload> {
    const communityId = validateAndDecodeGlobalId(
      challengeInput.communityId,
      "Community"
    );
    const newChallenge = await this.challengeService.create(
      { ...challengeInput, communityId, ownerId: userId },
      { ...activityInput }
    );

    return {
      challengeEdge: {
        __typename: "ChallengeEdge",
        cursor: newChallenge.id,
        node: newChallenge,
      },
    };
  }

  @Mutation("challengeUpdate")
  async challengeUpdate(
    @Args("challengeUpdateInput") challengeInput: ChallengeUpdateInput
  ): Promise<Challenge> {
    return this.challengeService.update(challengeInput);
  }

  @Mutation("challengeInvite")
  async challengeInvite(
    @Args("challengeId") challengeId: string,
    @Args("userId") userId: string,
    @CurrentUser("userId") inviterId: number
  ): Promise<boolean> {
    const decodedChallengeId = validateAndDecodeGlobalId(
      challengeId,
      "Challenge"
    );
    const decodedUserId = validateAndDecodeGlobalId(userId, "User");
    return this.challengeInvitationsService.invite(
      decodedUserId,
      inviterId,
      decodedChallengeId
    );
  }

  @Query("challengeInvitations")
  async challengeInvitations(
    @Args("userId") userId: string
  ): Promise<ChallengeInvitation[]> {
    const decodedUserId = validateAndDecodeGlobalId(userId, "User");
    return this.challengeInvitationsService.findUserInvitationsReceived(
      decodedUserId
    );
  }

  @Mutation("challengeJoin")
  async challengeJoin(
    @Args("inviteId") inviteId: string,
    @CurrentUser("userId") userId: number
  ): Promise<boolean> {
    const decodedInviteId = validateAndDecodeGlobalId(
      inviteId,
      "ChallengeInvitation"
    );
    return this.challengeMembershipsService.join(userId, decodedInviteId);
  }

  @Mutation("challengeLeave")
  async challengeLeave(
    @Args("id") id: string,
    @CurrentUser("userId") userId: number
  ): Promise<boolean> {
    const decodedChallengeId = validateAndDecodeGlobalId(id, "Challenge");
    await this.challengeService.leave(userId, decodedChallengeId);
    return true;
  }

  @Mutation("challengeDelete")
  async challengeDelete(
    @Args("id") id: string,
    @CurrentUser("userId") userId: number
  ): Promise<boolean> {
    const decodedChallengeId = validateAndDecodeGlobalId(id, "Challenge");
    return this.challengeService.remove(decodedChallengeId, userId);
  }
}
