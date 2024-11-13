import {
  ChallengeActivityGoal,
  ChallengeActivityMeasurement,
} from "@o/api-gql";

import type {
  ChallengeActivityGoalLabel,
  ChallengeActivityMeasurementLabel,
} from "../challenge-activity.types";

export const challengeActivityMeasurementLabelToEnum = (
  label: ChallengeActivityMeasurementLabel
): ChallengeActivityMeasurement => {
  switch (label) {
    case "Count-Based":
      return ChallengeActivityMeasurement.Counting;
    case "Duration":
      return ChallengeActivityMeasurement.Duration;
    case "Improvement":
      return ChallengeActivityMeasurement.Improvement;
  }
};

export const challengeActivityGoalLabelToEnum = (
  label: ChallengeActivityGoalLabel
): ChallengeActivityGoal => {
  switch (label) {
    case "Lowest Number":
      return ChallengeActivityGoal.LowestNumber;
    case "Highest Number":
      return ChallengeActivityGoal.HighestNumber;
    case "Specific Target":
      return ChallengeActivityGoal.SpecificTarget;
    case "Shortest Time":
      return ChallengeActivityGoal.ShortestTime;
    case "Longest Time":
      return ChallengeActivityGoal.LongestTime;
    case "Most Improved":
      return ChallengeActivityGoal.MostImproved;
  }
};
