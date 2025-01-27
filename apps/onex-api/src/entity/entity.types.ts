type EntityIdentifiers =
  | "Viewer"
  | "Community"
  | "User"
  | "Challenge"
  | "ChallengeActivity"
  | "ChallengeActivityTopMover"
  | "StartingSoonChallenge"
  | "EndingSoonChallenge";

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

export type SearchableNumericFields<T, K extends keyof T> = Partial<
  Record<K, number | number[]>
>;

export interface FindByArgs {
  limit?: number;
  offset?: number;
}
