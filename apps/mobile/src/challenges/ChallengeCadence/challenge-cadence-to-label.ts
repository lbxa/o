import { ChallengeCadence } from "@ocorp/api";

import type { ChallengeCadenceLabel } from "./challenge-cadence.types";

export const challengeCadenceToLabel = (
  cadence: ChallengeCadence
): ChallengeCadenceLabel => {
  switch (cadence) {
    case ChallengeCadence.None:
      return "None";
    case ChallengeCadence.Daily:
      return "Daily";
    case ChallengeCadence.Weekly:
      return "Weekly";
    case ChallengeCadence.Biweekly:
      return "Biweekly";
    case ChallengeCadence.Monthly:
      return "Monthly";
    case ChallengeCadence.Yearly:
      return "Yearly";
    // case ChallengeCadence.Custom:
    //   return "Custom";
  }
};
