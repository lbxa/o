import { ChallengeMode } from "@o/api-gql";

import type { ChallengeModeLabel } from "./challenge-mode.types";

export const challengeModeToLabel = (
  mode: ChallengeMode
): ChallengeModeLabel => {
  switch (mode) {
    case ChallengeMode.BlindTrust:
      return "Blind Trust";
    case ChallengeMode.BuddySystem:
      return "Buddy System";
    case ChallengeMode.VerifiedOnly:
      return "Verified Only";
  }
};
