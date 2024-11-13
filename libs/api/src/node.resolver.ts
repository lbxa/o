import { Args, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { ChallengeService } from "./challenge/challenge.service";
import { ChallengeActivitiesService } from "./challenge/challenge-activity";
import { ChallengeActivityResultsService } from "./challenge/challenge-activity-results";
import { CommunityService } from "./community/community.service";
import type { Node } from "./types/graphql";
import { UserService } from "./user/user.service";
import { decodeGlobalId } from "./utils";

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
  constructor(
    private readonly userService: UserService,
    private readonly communityService: CommunityService,
    private readonly challengeService: ChallengeService,
    private readonly challengesActivitiesService: ChallengeActivitiesService,
    // eslint-disable-next-line @stylistic/js/max-len
    private readonly challengeActivityResultsService: ChallengeActivityResultsService
  ) {}

  @ResolveField()
  __resolveType(node: Node): string {
    const { type: entityType } = decodeGlobalId(node.id);
    switch (entityType) {
      case "User":
        return this.userService.getTypename();
      case "Community":
        return this.communityService.getTypename();
      case "Challenge":
        return this.challengeService.getTypename();
      case "ChallengeActivity":
        return this.challengesActivitiesService.getTypename();
      case "ChallengeActivityResult":
        return this.challengeActivityResultsService.getTypename();
      default:
        throw new Error(`Unknown entity type: ${entityType}`);
    }
  }

  @Query()
  async node(@Args("id") id: string): Promise<Node | undefined> {
    const { id: decodedId, type: entityType } = decodeGlobalId(id);

    switch (entityType) {
      case "User":
        return this.userService.findById(decodedId);
      case "Community":
        return this.communityService.findById(decodedId);
      case "Challenge":
        return this.challengeService.findById(decodedId);
      case "ChallengeActivity":
        return this.challengesActivitiesService.findById(decodedId);
      case "ChallengeActivityResult":
        return this.challengeActivityResultsService.findById(decodedId);
      default:
        throw new Error(`Unknown entity type: ${entityType}`);
    }
  }
}
