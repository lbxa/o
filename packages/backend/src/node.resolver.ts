import { Args, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { ChallengeActivitiesService } from "./challenges/challenge-activity";
import { ChallengeActivityResultsService } from "./challenges/challenge-activity-results";
import { ChallengesService } from "./challenges/challenges.service";
import { CommunitiesService } from "./communities/communities.service";
import type { Node } from "./types/graphql";
import { UsersService } from "./users/users.service";
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
    private readonly usersService: UsersService,
    private readonly communitiesService: CommunitiesService,
    private readonly challengesService: ChallengesService,
    private readonly challengesActivitiesService: ChallengeActivitiesService,
    // eslint-disable-next-line @stylistic/js/max-len
    private readonly challengeActivityResultsService: ChallengeActivityResultsService
  ) {}

  @ResolveField()
  __resolveType(node: Node): string {
    const { type: entityType } = decodeGlobalId(node.id);
    switch (entityType) {
      case "User":
        return this.usersService.getTypename();
      case "Community":
        return this.communitiesService.getTypename();
      case "Challenge":
        return this.challengesService.getTypename();
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
        return this.usersService.findById(decodedId);
      case "Community":
        return this.communitiesService.findById(decodedId);
      case "Challenge":
        return this.challengesService.findById(decodedId);
      case "ChallengeActivity":
        return this.challengesActivitiesService.findById(decodedId);
      case "ChallengeActivityResult":
        return this.challengeActivityResultsService.findById(decodedId);
      default:
        throw new Error(`Unknown entity type: ${entityType}`);
    }
  }
}
