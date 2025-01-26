import { Injectable } from "@nestjs/common";

import { ChallengeService } from "@/challenge";
import type { HomeFeedConnection } from "@/types/graphql";
import { UserRecordsService } from "@/user/user-records";
import { buildConnection, ConnectionArgs } from "@/utils/pagination";

@Injectable()
export class HomeFeedService {
  constructor(
    private readonly challengeService: ChallengeService,
    private readonly userRecordsService: UserRecordsService
  ) {}

  async getHomeFeed(
    viewerId: number,
    { first = 10, after }: ConnectionArgs
  ): Promise<HomeFeedConnection> {
    // const challenges = await this.challengeService.findUserChallenges(viewerId);

    const endingSoonChallenges =
      await this.challengeService.findChallengesEndingSoon(viewerId);

    const startingSoonChallenges =
      await this.challengeService.findChallengesStartingSoon(viewerId);

    const userRecords = await this.userRecordsService.findByUserId(viewerId);

    const seenChallengeIds = new Set<string>();
    const combinedChallenges = [
      ...endingSoonChallenges,
      ...startingSoonChallenges,
    ].filter((item) => {
      if (seenChallengeIds.has(item.challenge.id)) return false;
      seenChallengeIds.add(item.challenge.id);
      return true;
    });

    // Combine and sort both arrays by createdAt in descending order (newest first)
    const combinedFeed = [
      // ...challenges.map((c) => ({ ...c, __typename: "Challenge" as const })),
      ...combinedChallenges,
      ...userRecords.map((ur) => ({
        ...ur,
        __typename: "UserRecord" as const,
      })),
    ].sort(
      (a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0)
    );

    // If after cursor is provided, find the index and slice the array
    let startIndex = 0;
    if (after) {
      startIndex = combinedFeed.findIndex((item) => item.id === after) + 1;
    }

    const nodes = combinedFeed.slice(startIndex, startIndex + first);

    return buildConnection({
      nodes,
      hasNextPage: startIndex + first < combinedFeed.length,
      hasPreviousPage: startIndex > 0,
      createCursor: (node) => node.id,
    });
  }
}
