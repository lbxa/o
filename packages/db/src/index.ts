/* eslint-disable simple-import-sort/exports */
//! IMPORTANT: DO NOT EXPORT ANYTHING OTHER THAN DRIZZLE CONSTRUCTS FROM HERE
//! This barrel file is intended to be the only exit point. The import * as schema
//! from "@o/db" syntax is used in other packages. I've chosen an explicit
//! export format because nothing should ever be a surprise! Sometimes we
//! add Drizzle schema that shouldn't be exported like util types or other
//! non-schema things that can cause runtime errors in other packages.

/**
 * USER
 */
export type { NewUser, User } from "./schema/user.schema";
export { UserSchema, UsersTable } from "./schema/user.schema";
export { UsersRelations } from "./relations/user.relations";

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
export {
  CommunitySchema,
  CommunitiesTable,
  CommunityMembershipsTable,
  CommunityInvitationsTable,
} from "./schema/community.schema";
export {
  CommunitiesRelations,
  CommunityMembershipsRelations,
  CommunityInvitationsRelations,
} from "./relations/community.relations";

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
export {
  ChallengeSchema,
  ChallengeMode,
  ChallengeCadence,
  ChallengesTable,
  ChallengeMembershipsTable,
  ChallengeInvitationsTable,
  ChallengeActivityType,
  ChallengeActivityUnits,
  ChallengeActivityGoal,
  ChallengeActivityMeasurement,
  ChallengeActivitiesTable,
  ChallengeActivityResultsTable,
  ActivityUnitTable,
  MeasurementGoalTable,
} from "./schema/challenge.schema";
export {
  ChallengesRelations,
  ChallengeMembershipsRelations,
  ChallengeInvitationsRelations,
  ChallengeActivitiesRelations,
  ChallengeActivityResultRelations,
} from "./relations/challenge.relations";

/**
 * SHARED/MISC
 */
export { InvitationStatus } from "./schema/shared";
