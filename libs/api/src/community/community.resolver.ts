import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import {
  CommunitiesTable,
  CommunityMembershipsTable,
  NewCommunity,
} from "@o/db";
import * as schema from "@o/db";
import { eq } from "drizzle-orm";

import { ChallengeService } from "../challenge/challenge.service";
import { DbService } from "../db/db.service";
import { CurrentUser } from "../decorators/current-user.decorator";
import {
  Challenge,
  Community,
  CommunityCreatePayload,
  CommunityInvitation,
} from "../types/graphql";
import { encodeGlobalId, validateAndDecodeGlobalId } from "../utils";
import { ConflictError, InternalServerError } from "../utils/errors";
import { CommunityService } from "./community.service";

@Resolver("Community")
export class CommunityResolver {
  constructor(
    private dbService: DbService<typeof schema>,
    private communityService: CommunityService,
    private challengeService: ChallengeService
  ) {}

  @ResolveField()
  async challenges(@Parent() community: Community): Promise<Challenge[]> {
    const communityId = validateAndDecodeGlobalId(community.id, "Community");
    return this.challengeService.findCommunityChallenges(communityId);
  }

  @Query("community")
  async community(@Args("id") id: string): Promise<Community | undefined> {
    const communityId = validateAndDecodeGlobalId(id, "Community");
    return this.communityService.findById(communityId);
  }

  @Mutation("communityInvite")
  async communityInvite(
    @Args("communityId") communityId: string,
    @Args("userId") userId: string,
    @CurrentUser("userId") inviterId: number
  ): Promise<boolean> {
    const decodedCommunityId = validateAndDecodeGlobalId(
      communityId,
      "Community"
    );
    const decodedUserId = validateAndDecodeGlobalId(userId, "User");
    return this.communityService.invite(
      decodedUserId,
      decodedCommunityId,
      inviterId
    );
  }

  @Query("communityInvitations")
  async communityInvitations(
    @Args("userId") userId: string
  ): Promise<CommunityInvitation[]> {
    const decodedUserId = validateAndDecodeGlobalId(userId, "User");
    return this.communityService.findUserInvitations(decodedUserId);
  }

  @Mutation("communityJoin")
  async communityJoin(
    @Args("inviteId") inviteId: string,
    @CurrentUser("userId") userId: number
  ): Promise<Community | undefined> {
    const decodedInviteId = validateAndDecodeGlobalId(
      inviteId,
      "CommunityInvitation"
    );
    return this.communityService.join(userId, decodedInviteId);
  }

  @Mutation("communityLeave")
  async communityLeave(
    @Args("id") id: string,
    @CurrentUser("userId") userId: number
  ): Promise<boolean> {
    const decodedCommunityId = validateAndDecodeGlobalId(id, "Community");
    await this.communityService.leave(userId, decodedCommunityId);
    return true;
  }

  // TODO
  // - test for admin role
  // - remove all active memberships
  // - remove all pending invitations
  @Mutation("communityDelete")
  async communityDelete(
    @Args("id") id: string,
    @CurrentUser("userId") userId: number
  ): Promise<boolean> {
    const decodedCommunityId = validateAndDecodeGlobalId(id, "Community");
    await this.communityService.leave(userId, decodedCommunityId);
    return this.communityService.remove(decodedCommunityId);
  }

  @Mutation("communityCreate")
  async communityCreate(
    @Args("communityCreateInput") input: NewCommunity,
    @CurrentUser("userId") userId: number
  ): Promise<CommunityCreatePayload | undefined> {
    const existing = await this.dbService.db.query.CommunitiesTable.findFirst({
      where: eq(CommunitiesTable.name, input.name),
    });

    if (existing) {
      throw new ConflictError("Community name already taken");
    }

    const [newCommunity] = await this.dbService.db
      .insert(CommunitiesTable)
      .values({ ...input, ownerId: userId })
      .returning();

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!newCommunity) {
      throw new InternalServerError("Failed to create community membership");
    }

    await this.dbService.db
      .insert(CommunityMembershipsTable)
      .values({ userId, communityId: newCommunity.id, isAdmin: true });

    return {
      communityEdge: {
        __typename: "CommunityEdge",
        cursor: encodeGlobalId("Community", newCommunity.id),
        node: this.communityService.pg2GqlMapper(newCommunity),
      },
    };
  }
}
