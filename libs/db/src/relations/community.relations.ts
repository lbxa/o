import { relations } from "drizzle-orm";

import { ChallengesTable } from "../schema/challenge.schema";
import {
  CommunitiesTable,
  CommunityInvitationsTable,
  CommunityMembershipsTable,
} from "../schema/community.schema";
import { UsersTable } from "../schema/user.schema";

export const CommunitiesRelations = relations(
  CommunitiesTable,
  ({ one, many }) => ({
    owner: one(UsersTable, {
      fields: [CommunitiesTable.ownerId],
      references: [UsersTable.id],
    }),
    memberships: many(CommunityMembershipsTable),
    invitations: many(CommunityInvitationsTable),
    challenges: many(ChallengesTable),
  })
);

export const CommunityMembershipsRelations = relations(
  CommunityMembershipsTable,
  ({ one }) => ({
    user: one(UsersTable, {
      fields: [CommunityMembershipsTable.userId],
      references: [UsersTable.id],
    }),
    community: one(CommunitiesTable, {
      fields: [CommunityMembershipsTable.communityId],
      references: [CommunitiesTable.id],
    }),
  })
);

export const CommunityInvitationsRelations = relations(
  CommunityInvitationsTable,
  ({ one }) => ({
    community: one(CommunitiesTable, {
      fields: [CommunityInvitationsTable.communityId],
      references: [CommunitiesTable.id],
    }),
    inviter: one(UsersTable, {
      fields: [CommunityInvitationsTable.inviterId],
      references: [UsersTable.id],
      relationName: "communityInviter",
    }),
    invitee: one(UsersTable, {
      fields: [CommunityInvitationsTable.inviteeId],
      references: [UsersTable.id],
      relationName: "communityInvitee",
    }),
  })
);
