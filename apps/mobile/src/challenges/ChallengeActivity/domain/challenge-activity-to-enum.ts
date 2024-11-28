import { ChallengeActivityGoal } from "@o/api-gql";

import type { ChallengeActivityGoalLabel } from "../challenge-activity.types";

export const challengeActivityGoalLabelToEnum = (
  label: ChallengeActivityGoalLabel
): ChallengeActivityGoal => {
  switch (label) {
    case "Lowest Number":
      return ChallengeActivityGoal.LowestNumber;
    case "Highest Number":
      return ChallengeActivityGoal.HighestNumber;
    case "Target":
      return ChallengeActivityGoal.SpecificTarget;
    case "Shortest Time":
      return ChallengeActivityGoal.ShortestTime;
    case "Longest Time":
      return ChallengeActivityGoal.LongestTime;
    case "Most Improved":
      return ChallengeActivityGoal.MostImproved;
  }
};
