import type { ChallengeActivityResult as GqlChallengeActivityResult } from "../../../types/graphql";

interface RankingStrategy {
  rank(results: GqlChallengeActivityResult[]): GqlChallengeActivityResult[];
}

export class LowestNumberStrategy implements RankingStrategy {
  rank(results: GqlChallengeActivityResult[]): GqlChallengeActivityResult[] {
    return results.sort((a, b) => a.result - b.result);
  }
}

export class HighestNumberStrategy implements RankingStrategy {
  rank(results: GqlChallengeActivityResult[]): GqlChallengeActivityResult[] {
    return results.sort((a, b) => b.result - a.result);
  }
}

export class ShortestTimeStrategy implements RankingStrategy {
  rank(results: GqlChallengeActivityResult[]): GqlChallengeActivityResult[] {
    return results.sort((a, b) => a.result - b.result);
  }
}

export class LongestTimeStrategy implements RankingStrategy {
  rank(results: GqlChallengeActivityResult[]): GqlChallengeActivityResult[] {
    return results.sort((a, b) => b.result - a.result);
  }
}

export class MostImprovedStrategy implements RankingStrategy {
  rank(results: GqlChallengeActivityResult[]): GqlChallengeActivityResult[] {
    return results.sort((a, b) => b.result - a.result);
  }
}

export class SpecificTargetStrategy implements RankingStrategy {
  rank(results: GqlChallengeActivityResult[]): GqlChallengeActivityResult[] {
    // Implement specific target ranking logic
    return results; // Placeholder
  }
}

export function getRankingStrategy(goal: string): RankingStrategy {
  switch (goal) {
    case "LOWEST_NUMBER":
      return new LowestNumberStrategy();
    case "HIGHEST_NUMBER":
      return new HighestNumberStrategy();
    case "SHORTEST_TIME":
      return new ShortestTimeStrategy();
    case "LONGEST_TIME":
      return new LongestTimeStrategy();
    case "MOST_IMPROVED":
      return new MostImprovedStrategy();
    case "SPECIFIC_TARGET":
      return new SpecificTargetStrategy();
    default:
      throw new Error(`Unknown goal: ${goal}`);
  }
}
