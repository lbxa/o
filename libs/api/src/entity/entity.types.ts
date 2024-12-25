type EntityIdentifiers =
  | "Viewer"
  | "Community"
  | "User"
  | "Challenge"
  | "ChallengeActivity";

type EntitySecondaryIdentifiers =
  | "Invitation"
  | "Result"
  | "Membership"
  | "Friendship"
  | "Record"
  | "Streak";

export type EntityType =
  | EntityIdentifiers
  | `${EntityIdentifiers}${EntitySecondaryIdentifiers}`;
