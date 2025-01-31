/* eslint-disable @stylistic/js/max-len */
import { Args, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { ChallengeService } from "@/challenge/challenge.service";
import { ChallengeActivityService } from "@/challenge/challenge-activity";
import { ChallengeActivityResultsService } from "@/challenge/challenge-activity-results";
import { CommunityService } from "@/community/community.service";
import { CommunityInvitationsService } from "@/community/community-invitations";
import { EntityService } from "@/entity/entity-service";
import type { Node } from "@/types/graphql";
import { UserService } from "@/user/user.service";
import { UserFriendshipService } from "@/user/user-friendship";
import { UserRecordsService } from "@/user/user-records/user-records.service";
import { UserStreaksService } from "@/user/user-streaks/user-streaks.service";
import { decodeGlobalId } from "@/utils";

/**
 * Critical component to implementing graphql compliant
 * global object identification
 *
 * @see https://graphql.org/learn/global-object-identification/
 *
 * For nestjs specific documentation:
 * @see https://docs.nestjs.com/graphql/interfaces#schema-first
 */
@Resolver("Node")
export class NodeResolver {
  private readonly entityServiceMap: Record<string, EntityService>;

  constructor(
    private readonly userService: UserService,
    private readonly communityService: CommunityService,
    private readonly challengeService: ChallengeService,
    private readonly challengesActivitiesService: ChallengeActivityService,
    private readonly userFriendshipService: UserFriendshipService,
    private readonly userStreaksService: UserStreaksService,
    private readonly userRecordsService: UserRecordsService,
    private readonly challengeActivityResultsService: ChallengeActivityResultsService,
    private readonly communityInvitationsService: CommunityInvitationsService
  ) {
    this.entityServiceMap = {
      User: this.userService,
      Community: this.communityService,
      Challenge: this.challengeService,
      ChallengeActivity: this.challengesActivitiesService,
      ChallengeActivityResult: this.challengeActivityResultsService,
      CommunityInvitation: this.communityInvitationsService,
      UserFriendship: this.userFriendshipService,
      UserStreak: this.userStreaksService,
      UserRecord: this.userRecordsService,
    };
  }

  @ResolveField()
  __resolveType(node: Node): string {
    const { type: entityType } = decodeGlobalId(node.id);

    if (entityType === "Viewer") {
      return "Viewer";
    }

    const service = this.entityServiceMap[entityType];
    if (!service) {
      throw new Error(`Unknown entity type: ${entityType}`);
    }

    return service.getTypename();
  }

  @Query()
  async node(@Args("id") id: string): Promise<Node | undefined> {
    const { id: decodedId, type: entityType } = decodeGlobalId(id);

    if (entityType === "Viewer") {
      return { id };
    }

    const service = this.entityServiceMap[entityType];
    if (!service) {
      throw new Error(`Unknown entity type: ${entityType}`);
    }

    return service.findById(decodedId);
  }
}
