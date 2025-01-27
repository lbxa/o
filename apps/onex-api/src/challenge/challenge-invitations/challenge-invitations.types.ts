import type { User as PgUser } from "@o/db";
import type { ChallengeInvitation as PgChallengeInvitation } from "@o/db";

import type { PgChallengeComposite } from "@/challenge/challenge.types";

export type PgChallengeInvitationComposite = PgChallengeInvitation & {
  challenge: PgChallengeComposite;
  inviter: PgUser;
  invitee: PgUser;
};
