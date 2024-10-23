import {
  ChallengeActivityGoal,
  ChallengeActivityMeasurement,
  ChallengeActivityType,
  ChallengeActivityUnits,
} from "@o/api";

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
  [ChallengeActivityType.Repetitions, [ChallengeActivityUnits.None]],
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
  [ChallengeActivityType.Social, [ChallengeActivityUnits.None]],
]);
