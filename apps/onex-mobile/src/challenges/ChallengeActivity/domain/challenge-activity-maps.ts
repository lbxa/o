import {
  ChallengeActivityGoal,
  ChallengeActivityType,
  ChallengeActivityUnits,
} from "@o/onex-api-gql";

export const ChallengeActivityTypeToGoalMap = new Map<
  ChallengeActivityType,
  ChallengeActivityGoal[]
>([
  [
    ChallengeActivityType.Repetitions,
    [
      ChallengeActivityGoal.LowestNumber,
      ChallengeActivityGoal.HighestNumber,
      ChallengeActivityGoal.MostImproved,
      ChallengeActivityGoal.SpecificTarget,
    ],
  ],
  [
    ChallengeActivityType.TimeBased,
    [
      ChallengeActivityGoal.ShortestTime,
      ChallengeActivityGoal.LongestTime,
      ChallengeActivityGoal.MostImproved,
      ChallengeActivityGoal.SpecificTarget,
    ],
  ],
  [
    ChallengeActivityType.Weightlifting,
    [
      ChallengeActivityGoal.LowestNumber,
      ChallengeActivityGoal.HighestNumber,
      ChallengeActivityGoal.MostImproved,
      ChallengeActivityGoal.SpecificTarget,
    ],
  ],
  [
    ChallengeActivityType.Distance,
    [
      ChallengeActivityGoal.ShortestDistance,
      ChallengeActivityGoal.LongestDistance,
      ChallengeActivityGoal.ShortestTime,
      ChallengeActivityGoal.LongestTime,
      ChallengeActivityGoal.MostImproved,
      ChallengeActivityGoal.SpecificTarget,
    ],
  ],
  [ChallengeActivityType.Social, []],
]);

export const ChallengeActivityTypeToUnitsMap = new Map<
  ChallengeActivityType,
  ChallengeActivityUnits[]
>([
  [ChallengeActivityType.Repetitions, []],
  [
    ChallengeActivityType.TimeBased,
    [
      ChallengeActivityUnits.Seconds,
      ChallengeActivityUnits.Minutes,
      ChallengeActivityUnits.Hours,
    ],
  ],
  [
    ChallengeActivityType.Weightlifting,
    [ChallengeActivityUnits.Kilograms, ChallengeActivityUnits.Pounds],
  ],
  [
    ChallengeActivityType.Distance,
    [
      ChallengeActivityUnits.Metres,
      ChallengeActivityUnits.Kilometres,
      ChallengeActivityUnits.Miles,
      ChallengeActivityUnits.Feet,
    ],
  ],
  [ChallengeActivityType.Social, []],
]);
