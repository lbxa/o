import type { User as PgUser } from "@o/db";
import type { CommunityInvitation as PgCommunityInvitation } from "@o/db";

import type { PgCommunityComposite } from "@/community/community.types";

export type PgCommunityInvitationComposite = PgCommunityInvitation & {
  community: PgCommunityComposite;
  inviter: PgUser;
  invitee: PgUser;
};
