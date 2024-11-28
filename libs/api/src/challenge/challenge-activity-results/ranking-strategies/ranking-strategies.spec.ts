import type {
  ChallengeActivity,
  ChallengeActivityResult,
} from "../../../types/graphql";
import {
  ChallengeActivityGoal,
  ChallengeActivityType,
  ChallengeActivityUnits,
} from "../../../types/graphql";
import {
  getRankingStrategy,
  HighestNumberStrategy,
  LongestTimeStrategy,
  LowestNumberStrategy,
  MostImprovedStrategy,
  ShortestTimeStrategy,
  SpecificTargetStrategy,
} from "./ranking-strategies";

describe("Ranking Strategies", () => {
  let sampleResults: ChallengeActivityResult[];

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
        createdAt: new Date("2023-01-01T10:00:00Z"),
        updatedAt: new Date("2023-01-01T10:00:00Z"),
      },
      {
        id: "2",
        user: { id: "u2" },
        activity: fakeActivity,
        result: 75,
        createdAt: new Date("2023-01-02T10:00:00Z"),
        updatedAt: new Date("2023-01-02T10:00:00Z"),
      },
      {
        id: "3",
        user: { id: "u3" },
        activity: fakeActivity,
        result: 25,
        createdAt: new Date("2023-01-03T10:00:00Z"),
        updatedAt: new Date("2023-01-03T10:00:00Z"),
      },
      {
        id: "4",
        user: { id: "u4" },
        activity: fakeActivity,
        result: 75,
        createdAt: new Date("2023-01-04T10:00:00Z"),
        updatedAt: new Date("2023-01-04T10:00:00Z"),
      },
    ];
  });

  describe("LowestNumberStrategy", () => {
    it("should rank results in ascending order (lowest to highest)", () => {
      const strategy = new LowestNumberStrategy();
      const rankedResults = strategy.rank(sampleResults);

      expect(rankedResults.map((r) => r.id)).toEqual(["3", "1", "2", "4"]);
    });
  });

  describe("HighestNumberStrategy", () => {
    it("should rank results in descending order (highest to lowest)", () => {
      const strategy = new HighestNumberStrategy();
      const rankedResults = strategy.rank(sampleResults);

      expect(rankedResults.map((r) => r.id)).toEqual(["2", "4", "1", "3"]);
    });
  });

  describe("ShortestTimeStrategy", () => {
    it("should rank results in ascending order (shortest to longest)", () => {
      const strategy = new ShortestTimeStrategy();
      const rankedResults = strategy.rank(sampleResults);

      expect(rankedResults.map((r) => r.id)).toEqual(["3", "1", "2", "4"]);
    });
  });

  describe("LongestTimeStrategy", () => {
    it("should rank results in descending order (longest to shortest)", () => {
      const strategy = new LongestTimeStrategy();
      const rankedResults = strategy.rank(sampleResults);

      expect(rankedResults.map((r) => r.id)).toEqual(["2", "4", "1", "3"]);
    });
  });

  // TODO implement this
  // describe("MostImprovedStrategy", () => {
  //   it("should rank results based on improvement", () => {
  //     // Assuming we have a previousResult property to calculate improvement
  //     const resultsWithImprovement = sampleResults.map((result, index) => ({
  //       ...result,
  //       previousResult: [70, 80, 50, 90][index], // Sample previous results
  //     }));

  //     const strategy = new MostImprovedStrategy();
  //     const rankedResults = strategy.rank(resultsWithImprovement);

  //     expect(rankedResults.map((r) => r.id)).toEqual(["3", "1", "2", "4"]);
  //   });
  // });

  describe("SpecificTargetStrategy", () => {
    it("should rank results based on closeness to a specific target", () => {
      // Assuming target is 60
      const target = 60;

      const strategy = new SpecificTargetStrategy(target);
      const rankedResults = strategy.rank(sampleResults);

      expect(rankedResults.map((r) => r.id)).toEqual(["1", "2", "4", "3"]);
    });
  });

  describe("getRankingStrategy", () => {
    it("should return the correct strategy instance for each goal", () => {
      expect(getRankingStrategy("LOWEST_NUMBER")).toBeInstanceOf(
        LowestNumberStrategy
      );
      expect(getRankingStrategy("HIGHEST_NUMBER")).toBeInstanceOf(
        HighestNumberStrategy
      );
      expect(getRankingStrategy("SHORTEST_TIME")).toBeInstanceOf(
        ShortestTimeStrategy
      );
      expect(getRankingStrategy("LONGEST_TIME")).toBeInstanceOf(
        LongestTimeStrategy
      );
      expect(getRankingStrategy("MOST_IMPROVED")).toBeInstanceOf(
        MostImprovedStrategy
      );
      expect(getRankingStrategy("SPECIFIC_TARGET", 60)).toBeInstanceOf(
        SpecificTargetStrategy
      );
    });

    it("should throw an error for unknown goals", () => {
      expect(() => getRankingStrategy("UNKNOWN_GOAL")).toThrow(
        "Unknown goal: UNKNOWN_GOAL"
      );
    });
  });
});
