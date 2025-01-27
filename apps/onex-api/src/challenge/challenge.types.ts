import type { Challenge as PgChallenge } from "@o/db";

import type { PgChallengeActivityComposite } from "@/challenge/challenge-activity/challenge-activity.types";
import type { PgCommunityComposite } from "@/community/community.types";

export type PgChallengeComposite = PgChallenge & {
  activities: PgChallengeActivityComposite[];
  community: PgCommunityComposite;
};
