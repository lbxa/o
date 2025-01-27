import type {
  ChallengeActivity,
  ChallengeActivityResult,
} from "@/types/graphql";
import {
  ChallengeActivityGoal,
  ChallengeActivityType,
  ChallengeActivityUnits,
} from "@/types/graphql";

import { RankingService } from "../ranking-service";
import {
  AscendingRankingStrategy,
  DescendingRankingStrategy,
  EuclideanDistanceStrategy,
} from "./ranking-strategies";

describe("Ranking Strategies", () => {
  let sampleResults: ChallengeActivityResult[];
  let rankingService: RankingService;

  beforeEach(() => {
    const fakeActivity: ChallengeActivity = {
      id: "a1",
      type: ChallengeActivityType.SOCIAL,
      goal: ChallengeActivityGoal.LONGEST_TIME,
      unit: ChallengeActivityUnits.MINUTES,
    };

    sampleResults = [
      {
        id: "1",
        user: { id: "u1" },
        activity: fakeActivity,
        result: 50,
        formattedResult: "50",
        createdAt: new Date("2023-01-01T10:00:00Z"),
        updatedAt: new Date("2023-01-01T10:00:00Z"),
      },
      {
        id: "2",
        user: { id: "u2" },
        activity: fakeActivity,
        result: 75,
        formattedResult: "75",
        createdAt: new Date("2023-01-02T10:00:00Z"),
        updatedAt: new Date("2023-01-02T10:00:00Z"),
      },
      {
        id: "3",
        user: { id: "u3" },
        activity: fakeActivity,
        result: 25,
        formattedResult: "25",
        createdAt: new Date("2023-01-03T10:00:00Z"),
        updatedAt: new Date("2023-01-03T10:00:00Z"),
      },
      {
        id: "4",
        user: { id: "u4" },
        activity: fakeActivity,
        result: 75,
        formattedResult: "75",
        createdAt: new Date("2023-01-04T10:00:00Z"),
        updatedAt: new Date("2023-01-04T10:00:00Z"),
      },
    ];

    rankingService = new RankingService();
  });

  describe("DescendingRankingStrategy (Lowest Number)", () => {
    it("should rank results in ascending order (lowest to highest)", () => {
      const strategy = new DescendingRankingStrategy(
        (r: ChallengeActivityResult) => r.result
      );
      const rankedResults = strategy.rank(sampleResults);

      expect(rankedResults.map((r) => r.id)).toEqual(["3", "1", "2", "4"]);
    });
  });

  describe("AscendingRankingStrategy (Highest Number)", () => {
    it("should rank results in descending order (highest to lowest)", () => {
      const strategy = new AscendingRankingStrategy(
        (r: ChallengeActivityResult) => r.result
      );
      const rankedResults = strategy.rank(sampleResults);

      expect(rankedResults.map((r) => r.id)).toEqual(["2", "4", "1", "3"]);
    });
  });

  describe("DescendingRankingStrategy (Shortest Time)", () => {
    it("should rank results in ascending order (shortest to longest)", () => {
      const strategy = new DescendingRankingStrategy(
        (r: ChallengeActivityResult) => r.result
      );
      const rankedResults = strategy.rank(sampleResults);

      expect(rankedResults.map((r) => r.id)).toEqual(["3", "1", "2", "4"]);
    });
  });

  describe("AscendingRankingStrategy (Longest Time)", () => {
    it("should rank results in descending order (longest to shortest)", () => {
      const strategy = new AscendingRankingStrategy(
        (r: ChallengeActivityResult) => r.result
      );
      const rankedResults = strategy.rank(sampleResults);

      expect(rankedResults.map((r) => r.id)).toEqual(["2", "4", "1", "3"]);
    });
  });

  describe("EuclideanDistanceStrategy (Specific Target)", () => {
    it("should rank results based on closeness to a specific target", () => {
      const target = 60;
      const strategy = new EuclideanDistanceStrategy(
        target,
        (r: ChallengeActivityResult) => r.result
      );
      const rankedResults = strategy.rank(sampleResults);

      expect(rankedResults.map((r) => r.id)).toEqual(["1", "2", "4", "3"]);
    });
  });

  describe("RankingService", () => {
    it("should return the correct strategy instance for each goal", () => {
      const accessor = (r: ChallengeActivityResult) => r.result;

      expect(
        rankingService.getRankingStrategy({
          goal: ChallengeActivityGoal.LOWEST_NUMBER,
          accessor,
        })
      ).toBeInstanceOf(DescendingRankingStrategy);

      expect(
        rankingService.getRankingStrategy({
          goal: ChallengeActivityGoal.HIGHEST_NUMBER,
          accessor,
        })
      ).toBeInstanceOf(AscendingRankingStrategy);

      expect(
        rankingService.getRankingStrategy({
          goal: ChallengeActivityGoal.SHORTEST_TIME,
          accessor,
        })
      ).toBeInstanceOf(DescendingRankingStrategy);

      expect(
        rankingService.getRankingStrategy({
          goal: ChallengeActivityGoal.LONGEST_TIME,
          accessor,
        })
      ).toBeInstanceOf(AscendingRankingStrategy);

      expect(
        rankingService.getRankingStrategy({
          goal: ChallengeActivityGoal.MOST_IMPROVED,
          accessor,
        })
      ).toBeInstanceOf(AscendingRankingStrategy);

      expect(
        rankingService.getRankingStrategy({
          goal: ChallengeActivityGoal.SPECIFIC_TARGET,
          accessor,
          _target: 60,
        })
      ).toBeInstanceOf(AscendingRankingStrategy);
    });

    it("should throw an error for unknown goals", () => {
      expect(() =>
        rankingService.getRankingStrategy({
          goal: "UNKNOWN_GOAL" as ChallengeActivityGoal,
          accessor: (r: ChallengeActivityResult) => r.result,
        })
      ).toThrow("Unknown goal: UNKNOWN_GOAL");
    });
  });
});
