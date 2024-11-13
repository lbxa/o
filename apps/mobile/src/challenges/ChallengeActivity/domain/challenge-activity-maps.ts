import {
  ChallengeActivityGoal,
  ChallengeActivityMeasurement,
  ChallengeActivityType,
  ChallengeActivityUnits,
} from "@o/api-gql";

export const ChallengeActivityToMeasurementMap = new Map<
  ChallengeActivityType,
  ChallengeActivityMeasurement[]
>([
  [
    ChallengeActivityType.Repetitions,
    [
      ChallengeActivityMeasurement.Counting,
      ChallengeActivityMeasurement.Improvement,
    ],
  ],
  [
    ChallengeActivityType.TimeBased,
    [
      ChallengeActivityMeasurement.Duration,
      ChallengeActivityMeasurement.Improvement,
    ],
  ],
  [
    ChallengeActivityType.Weightlifting,
    [
      ChallengeActivityMeasurement.Counting,
      ChallengeActivityMeasurement.Improvement,
    ],
  ],
  [
    ChallengeActivityType.Distance,
    [
      ChallengeActivityMeasurement.Counting,
      ChallengeActivityMeasurement.Duration,
      ChallengeActivityMeasurement.Improvement,
    ],
  ],
  [ChallengeActivityType.Social, []],
]);

export const ChallengeActivityMeasurementToGoalMap = new Map<
  ChallengeActivityMeasurement,
  ChallengeActivityGoal[]
>([
  [
    ChallengeActivityMeasurement.Counting,
    [
      ChallengeActivityGoal.LowestNumber,
      ChallengeActivityGoal.HighestNumber,
      ChallengeActivityGoal.SpecificTarget,
    ],
  ],
  [
    ChallengeActivityMeasurement.Duration,
    [
      ChallengeActivityGoal.ShortestTime,
      ChallengeActivityGoal.LongestTime,
      ChallengeActivityGoal.SpecificTarget,
    ],
  ],
  [
    ChallengeActivityMeasurement.Improvement,
    [ChallengeActivityGoal.MostImproved, ChallengeActivityGoal.SpecificTarget],
  ],
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
