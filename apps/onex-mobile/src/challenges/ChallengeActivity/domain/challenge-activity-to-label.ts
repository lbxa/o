import {
  ChallengeActivityGoal,
  ChallengeActivityType,
  ChallengeActivityUnits,
} from "@o/api-gql";

import type {
  ChallengeActivityGoalLabel,
  ChallengeActivityLabel,
  ChallengeActivityUnitLabel,
} from "../challenge-activity.types";

export const challengeActivityTypeToLabel = (
  activity: ChallengeActivityType
): ChallengeActivityLabel => {
  switch (activity) {
    case ChallengeActivityType.Repetitions:
      return "Repetitions";
    case ChallengeActivityType.TimeBased:
      return "Time";
    case ChallengeActivityType.Weightlifting:
      return "Weightlifting";
    case ChallengeActivityType.Distance:
      return "Distance";
    case ChallengeActivityType.Social:
      return "Social";
  }
};

export const challengeActivityUnitToLabel = (
  unit: ChallengeActivityUnits
): ChallengeActivityUnitLabel => {
  switch (unit) {
    case ChallengeActivityUnits.Kilograms:
      return "kg";
    case ChallengeActivityUnits.Pounds:
      return "lb";
    case ChallengeActivityUnits.Metres:
      return "m";
    case ChallengeActivityUnits.Feet:
      return "ft";
    case ChallengeActivityUnits.Seconds:
      return "seconds";
    case ChallengeActivityUnits.Minutes:
      return "minutes";
    case ChallengeActivityUnits.Hours:
      return "hours";
    case ChallengeActivityUnits.Miles:
      return "mi";
    case ChallengeActivityUnits.Kilometres:
      return "km";
    case ChallengeActivityUnits.Percent:
      return "%";
    case ChallengeActivityUnits.None:
      return "";
  }
};

export const challengeActivityGoalToLabel = (
  goal: ChallengeActivityGoal
): ChallengeActivityGoalLabel => {
  switch (goal) {
    case ChallengeActivityGoal.LowestNumber:
      return "Lowest Number";
    case ChallengeActivityGoal.HighestNumber:
      return "Highest Number";
    case ChallengeActivityGoal.SpecificTarget:
      return "Target";
    case ChallengeActivityGoal.ShortestTime:
      return "Shortest Time";
    case ChallengeActivityGoal.LongestTime:
      return "Longest Time";
    case ChallengeActivityGoal.MostImproved:
      return "Most Improved";
    case ChallengeActivityGoal.ShortestDistance:
      return "Shortest Distance";
    case ChallengeActivityGoal.LongestDistance:
      return "Longest Distance";
  }
};
