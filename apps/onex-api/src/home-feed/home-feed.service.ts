import { Injectable } from "@nestjs/common";
import { $DrizzleSchema } from "@o/db";
import { UserFriendshipsTable } from "@o/db";
import { and } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { desc } from "drizzle-orm";

import { ChallengeService } from "@/challenge";
import { DbService } from "@/db/db.service";
import {
  HomeFeedConnection,
  InvitationStatus,
  UserRecord as GqlUserRecord,
} from "@/types/graphql";
import { UserFriendshipService, UserRecordsService } from "@/user";
import { buildConnection, ConnectionArgs } from "@/utils";

@Injectable()
export class HomeFeedService {
  constructor(
    private readonly challengeService: ChallengeService,
    private readonly userRecordsService: UserRecordsService,
    private readonly userFriendshipService: UserFriendshipService,
    private readonly dbService: DbService<typeof $DrizzleSchema>
  ) {}

  async getFriendRecords(viewerId: number): Promise<GqlUserRecord[]> {
    const followingIds =
      await this.dbService.db.query.UserFriendshipsTable.findMany({
        where: and(
          eq(UserFriendshipsTable.userId, viewerId),
          eq(UserFriendshipsTable.status, InvitationStatus.ACCEPTED)
        ),
        columns: {
          friendId: true,
        },
        // limit: limit + 1, // Get one extra to check if there are more results
        // offset: after,
        orderBy: desc(UserFriendshipsTable.createdAt),
      });

    const uniqueIds = new Set(followingIds.map((f) => f.friendId));

    const records = await this.userRecordsService.findBy({
      userId: [...uniqueIds],
    });

    return records;
  }

  async getHomeFeed(
    viewerId: number,
    { first = 10, after }: ConnectionArgs
  ): Promise<HomeFeedConnection> {
    // const challenges = await this.challengeService.findUserChallenges(viewerId);

    const endingSoonChallenges =
      await this.challengeService.findChallengesEndingSoon(viewerId);

    const startingSoonChallenges =
      await this.challengeService.findChallengesStartingSoon(viewerId);

    const seenChallengeIds = new Set<string>();
    const combinedChallenges = [
      ...endingSoonChallenges,
      ...startingSoonChallenges,
    ].filter((item) => {
      if (seenChallengeIds.has(item.challenge.id)) return false;
      seenChallengeIds.add(item.challenge.id);
      return true;
    });

    const friendRecords = await this.getFriendRecords(viewerId);

    // Combine and sort both arrays by createdAt in descending order (newest first)
    const combinedFeed = [
      // ...challenges.map((c) => ({ ...c, __typename: "Challenge" as const })),
      ...combinedChallenges,
      ...friendRecords.map((ur) => ({
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
