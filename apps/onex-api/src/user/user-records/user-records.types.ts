import type { User as PgUser, UserRecord as PgUserRecord } from "@o/db";

import type { PgChallengeComposite } from "@/challenge/challenge.types";
import type { PgChallengeActivityResultComposite } from "@/challenge/challenge-activity-results/challenge-activity-results.types";

export type PgUserRecordComposite = PgUserRecord & {
  user: PgUser;
  challenge: PgChallengeComposite;
  activityResult: PgChallengeActivityResultComposite;
};
