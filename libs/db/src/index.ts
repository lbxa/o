/* eslint-disable simple-import-sort/exports */
//! IMPORTANT: This barrel file is the single source of truth for our database schema.
//! All database-related imports should use either:
//! 1. Named imports for types: import type { Challenge, NewChallenge } from "@o/db"
//! 2. Schema object: import { schema } from "@o/db"
//!
//! The schema object contains all Drizzle constructs (tables, relations, enums)
//! in a type-safe way. This ensures consistency and prevents accidental imports
//! of internal utilities or non-schema constructs that could cause runtime errors.

/**
 * USER
 */
export type {
  NewUser,
  NewUserFriendship,
  NewUserRecord,
  NewUserStreak,
  User,
  UserFriendship,
  UserRecord,
  UserStreak,
} from "./schema/user.schema";
import {
  UserFriendshipsRelations,
  UserRecordsRelations,
  UsersRelations,
  UserStreaksRelations,
} from "./relations/user.relations";
import {
  UserFriendshipsTable,
  UserRecordsTable,
  UserSchema,
  UsersTable,
  UserStreaksTable,
} from "./schema/user.schema";

const $UserRelations = {
  UserFriendshipsRelations,
  UserRecordsRelations,
  UsersRelations,
  UserStreaksRelations,
};

const $UserSchema = {
  UserFriendshipsTable,
  UserRecordsTable,
  UserSchema,
  UsersTable,
  UserStreaksTable,
};

export {
  UserFriendshipsTable,
  UserRecordsTable,
  UserSchema,
  UsersTable,
  UserStreaksTable,
};

/**
 * COMMUNITY
 */
export type {
  Community,
  NewCommunity,
  CommunityMembership,
  NewCommunityMembership,
  CommunityInvitation,
  NewCommunityInvitation,
} from "./schema/community.schema";
import {
  CommunitiesRelations,
  CommunityInvitationsRelations,
  CommunityMembershipsRelations,
} from "./relations/community.relations";
import {
  CommunitiesTable,
  CommunityInvitationsTable,
  CommunityMembershipsTable,
  CommunitySchema,
} from "./schema/community.schema";

const $CommunityRelations = {
  CommunitiesRelations,
  CommunityInvitationsRelations,
  CommunityMembershipsRelations,
};

const $CommunitySchema = {
  CommunitiesTable,
  CommunityInvitationsTable,
  CommunityMembershipsTable,
  CommunitySchema,
};

export {
  CommunitiesTable,
  CommunityInvitationsTable,
  CommunityMembershipsTable,
  CommunitySchema,
};

/**
 * CHALLENGE
 */
export type {
  Challenge,
  NewChallenge,
  ChallengeMembership,
  NewChallengeMembership,
  ChallengeInvitation,
  NewChallengeInvitation,
  ChallengeActivity,
  NewChallengeActivity,
  ChallengeActivityResult,
  NewChallengeActivityResult,
} from "./schema/challenge.schema";
import {
  ChallengeActivitiesRelations,
  ChallengeActivityResultRelations,
  ChallengeInvitationsRelations,
  ChallengeMembershipsRelations,
  ChallengesRelations,
} from "./relations/challenge.relations";
import {
  ActivityTypeGoalTable,
  ActivityUnitTable,
  ChallengeActivitiesTable,
  ChallengeActivityGoal,
  ChallengeActivityResultsTable,
  ChallengeActivityType,
  ChallengeActivityUnits,
  ChallengeCadence,
  ChallengeInvitationsTable,
  ChallengeMembershipsTable,
  ChallengeMode,
  ChallengeSchema,
  ChallengesTable,
} from "./schema/challenge.schema";

const $ChallengeRelations = {
  ChallengeActivitiesRelations,
  ChallengeActivityResultRelations,
  ChallengeInvitationsRelations,
  ChallengeMembershipsRelations,
  ChallengesRelations,
};

const $ChallengeSchema = {
  ActivityTypeGoalTable,
  ActivityUnitTable,
  ChallengeActivitiesTable,
  ChallengeActivityGoal,
  ChallengeActivityResultsTable,
  ChallengeActivityType,
  ChallengeActivityUnits,
  ChallengeCadence,
  ChallengeInvitationsTable,
  ChallengeMembershipsTable,
  ChallengeMode,
  ChallengeSchema,
  ChallengesTable,
};

export {
  ActivityTypeGoalTable,
  ActivityUnitTable,
  ChallengeActivitiesTable,
  ChallengeActivityGoal,
  ChallengeActivityResultsTable,
  ChallengeActivityType,
  ChallengeActivityUnits,
  ChallengeCadence,
  ChallengeInvitationsTable,
  ChallengeMembershipsTable,
  ChallengeMode,
  ChallengeSchema,
  ChallengesTable,
};

/**
 * SHARED/MISC
 */
import { InvitationStatus } from "./schema/shared";

export const $DrizzleSchema = {
  ...$UserSchema,
  ...$UserRelations,
  ...$CommunitySchema,
  ...$CommunityRelations,
  ...$ChallengeSchema,
  ...$ChallengeRelations,
  InvitationStatus,
} as const;
