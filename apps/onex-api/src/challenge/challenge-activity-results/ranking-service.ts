import { Injectable } from "@nestjs/common";

import { ChallengeActivityGoal } from "@/types/graphql";

import type { Accessor, RankingStrategy } from "./ranking-strategies";
import {
  AscendingRankingStrategy,
  DescendingRankingStrategy,
} from "./ranking-strategies";

@Injectable()
export class RankingService {
  public getRankingStrategy<T>({
    goal,
    accessor,
    _target,
  }: {
    goal: ChallengeActivityGoal;
    accessor: Accessor<T, number>;
    _target?: number;
  }): RankingStrategy<T> {
    switch (goal) {
      case ChallengeActivityGoal.LOWEST_NUMBER:
        return new DescendingRankingStrategy(accessor);
      case ChallengeActivityGoal.HIGHEST_NUMBER:
        return new AscendingRankingStrategy(accessor);
      case ChallengeActivityGoal.SHORTEST_TIME:
        return new DescendingRankingStrategy(accessor);
      case ChallengeActivityGoal.LONGEST_TIME:
        return new AscendingRankingStrategy(accessor);
      case ChallengeActivityGoal.MOST_IMPROVED:
        return new AscendingRankingStrategy(accessor);
      case ChallengeActivityGoal.SPECIFIC_TARGET:
        return new AscendingRankingStrategy(accessor);
      default:
        throw new Error(`Unknown goal: ${goal}`);
    }
  }
}
