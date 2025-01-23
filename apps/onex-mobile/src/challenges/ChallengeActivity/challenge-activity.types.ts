export type ChallengeActivityLabel =
  | "Repetitions"
  | "Time"
  | "Weightlifting"
  | "Distance"
  | "Social";

export type ChallengeActivityUnitLabel =
  | "kg"
  | "lb"
  | "m"
  | "ft"
  | "seconds"
  | "minutes"
  | "hours"
  | "mi"
  | "km"
  | "%"
  | ""; // === 'None'

export type ChallengeActivityMeasurementLabel =
  | "Count-Based"
  | "Duration"
  | "Improvement";

export type ChallengeActivityGoalLabel =
  | "Lowest Number"
  | "Highest Number"
  | "Target"
  | "Shortest Time"
  | "Most Improved"
  | "Shortest Distance"
  | "Longest Distance"
  | "Longest Time";
