import type {
  ChallengeActivityResult as PgChallengeActivityResult,
  User as PgUser,
} from "@o/db";

import type { PgChallengeActivityComposite } from "@/challenge/challenge-activity/challenge-activity.types";

export type PgChallengeActivityResultComposite = PgChallengeActivityResult & {
  user: PgUser;
  activity: PgChallengeActivityComposite;
};
