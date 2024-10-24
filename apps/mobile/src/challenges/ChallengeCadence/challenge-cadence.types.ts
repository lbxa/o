export type ChallengeCadenceLabel =
  | "None"
  | "Daily"
  | "Weekly"
  | "Biweekly"
  | "Monthly"
  | "Yearly"
  | "Custom";

export interface CustomCadence {
  interval: number; // every n
  unit: "Hours" | "Days" | "Weeks" | "Months" | "Years";
}
