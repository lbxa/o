import {
  bigint,
  index,
  integer,
  pgSchema,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { withIdPk, withModificationDates } from "../helpers";
import { CommunitiesTable } from "./community.schema";
import { InvitationStatus } from "./shared/invitation-status-enum";
import { UsersTable } from "./user.schema";

export const ChallengeSchema = pgSchema("challenge");

export const ChallengeMode = ChallengeSchema.enum("mode", [
  "BLIND_TRUST",
  "BUDDY_SYSTEM",
  "VERIFIED_ONLY",
]);

export const ChallengeCadence = ChallengeSchema.enum("cadence", [
  "NONE",
  "DAILY",
  "WEEKLY",
  "BIWEEKLY",
  "MONTHLY",
  "YEARLY",
]);

export const ChallengesTable = ChallengeSchema.table(
  "challenges",
  {
    ...withIdPk,
    name: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
    ownerId: integer()
      .notNull()
      .references(() => UsersTable.id),
    communityId: integer()
      .notNull()
      .references(() => CommunitiesTable.id),
    startDate: timestamp().notNull(),
    mode: ChallengeMode().notNull().default("BLIND_TRUST"),
    cadence: ChallengeCadence().notNull().default("NONE"),
    endDate: timestamp().notNull(),
    ...withModificationDates,
  },
  (table) => ({
    nameIdx: index().on(table.name),
    communityIdx: index().on(table.communityId),
    dateIdx: index().on(table.startDate, table.endDate),
  })
);

export const ChallengeMembershipsTable = ChallengeSchema.table(
  "memberships",
  {
    ...withIdPk,
    userId: integer()
      .notNull()
      .references(() => UsersTable.id),
    challengeId: integer()
      .notNull()
      .references(() => ChallengesTable.id),
    communityId: integer()
      .notNull()
      .references(() => CommunitiesTable.id),
    joinedAt: timestamp().notNull().defaultNow(),
  },
  (table) => ({
    uniqueMembership: index().on(table.userId, table.challengeId),
  })
);

export const ChallengeInvitationsTable = ChallengeSchema.table("invitations", {
  ...withIdPk,
  challengeId: integer()
    .notNull()
    .references(() => ChallengesTable.id),
  inviterId: integer()
    .notNull()
    .references(() => UsersTable.id),
  inviteeId: integer()
    .notNull()
    .references(() => UsersTable.id),
  status: InvitationStatus().notNull().default("PENDING"),
  expiresAt: timestamp().notNull(),
  ...withModificationDates,
});

export const ChallengeActivityType = ChallengeSchema.enum("activity_type", [
  "REPETITIONS",
  "WEIGHTLIFTING",
  "TIME_BASED",
  "DISTANCE",
  "SOCIAL",
]);

export const ChallengeActivityUnits = ChallengeSchema.enum("activity_units", [
  "KILOGRAMS",
  "POUNDS",
  "METRES",
  "FEET",
  "SECONDS",
  "MINUTES",
  "HOURS",
  "MILES",
  "KILOMETRES",
  "PERCENT",
  "NONE",
]);

export const ChallengeActivityGoal = ChallengeSchema.enum("activity_goal", [
  "LOWEST_NUMBER",
  "HIGHEST_NUMBER",
  "SPECIFIC_TARGET",
  "SHORTEST_TIME",
  "LONGEST_TIME",
  "MOST_IMPROVED",
]);

export const ChallengeActivitiesTable = ChallengeSchema.table(
  "activities",
  {
    ...withIdPk,
    challengeId: integer()
      .notNull()
      .references(() => ChallengesTable.id),
    type: ChallengeActivityType().notNull(),
    // measurement: ChallengeActivityMeasurement().notNull(),
    goal: ChallengeActivityGoal().notNull(),
    target: integer(),
    unit: ChallengeActivityUnits().notNull(),
    ...withModificationDates,
  }
  // TODO enforce constraints for data integrity on postgres side
  // (table) => ({
  // activityUnitFk: foreignKey({
  //   columns: [table.unit, table.type],
  //   foreignColumns: [ActivityUnitTable.unit, ActivityUnitTable.activity],
  // }),
  // goalObjectiveFk: foreignKey({
  //   columns: [table.goal, table.target],
  //   foreignColumns: [GoalObjectiveTable.goal, GoalObjectiveTable.objective],
  // }),
  // })
);

export const ChallengeActivityResultsTable = ChallengeSchema.table(
  "activity_results",
  {
    ...withIdPk,
    userId: integer()
      .notNull()
      .references(() => UsersTable.id),
    activityId: integer()
      .notNull()
      .references(() => ChallengeActivitiesTable.id),
    challengeId: integer()
      .notNull()
      .references(() => ChallengesTable.id),
    /**
     * If you’re expecting values above 2^31 but below 2^53, you can
     * utilise mode: 'number' and deal with javascript number as
     * opposed to bigint.
     *
     * @see https://orm.drizzle.team/docs/column-types/pg#bigint
     */
    result: bigint({ mode: "number" }).notNull(),
    ...withModificationDates,
  }
);

// TODO add mapping tables for activity types, goals, and objectives
// to ensure data integrity on the postgres side. Be on the lookout for
// drizzle team's official seeding support

export const ActivityUnitTable = ChallengeSchema.table(
  "activity_unit",
  {
    activity: ChallengeActivityType().notNull(),
    unit: ChallengeActivityUnits().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.activity, table.unit] }),
  })
);

export const ActivityTypeGoalTable = ChallengeSchema.table(
  "activity_type_goal",
  {
    type: ChallengeActivityType().notNull(),
    goal: ChallengeActivityGoal().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.type, table.goal] }),
  })
);

export type Challenge = typeof ChallengesTable.$inferSelect;
export type NewChallenge = typeof ChallengesTable.$inferInsert;

export type ChallengeMembership = typeof ChallengeMembershipsTable.$inferSelect;
export type NewChallengeMembership =
  typeof ChallengeMembershipsTable.$inferInsert;

export type ChallengeInvitation = typeof ChallengeInvitationsTable.$inferSelect;
export type NewChallengeInvitation =
  typeof ChallengeInvitationsTable.$inferInsert;

export type ChallengeActivity = typeof ChallengeActivitiesTable.$inferSelect;
export type NewChallengeActivity = typeof ChallengeActivitiesTable.$inferInsert;

export type ChallengeActivityResult =
  typeof ChallengeActivityResultsTable.$inferSelect;
export type NewChallengeActivityResult =
  typeof ChallengeActivityResultsTable.$inferInsert;
