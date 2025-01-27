import type {
  Challenge as PgChallenge,
  ChallengeActivity as PgChallengeActivity,
} from "@o/db";

/**
 * TODO
 * adding this type creates a link in the api graph between activity <-> challenge
 * which the backend is not ready for. This will greatly complicate the api graph
 * database queries. I would prefer to keep the top-bottom approach until the
 * graphile backend is ready for this.
 *
 * Complexity is the enemy of scale.
 */
// import type { PgChallengeComposite } from "@/challenge/challenge.types";

export type PgChallengeActivityComposite = PgChallengeActivity & {
  challenge: PgChallenge; // TODO should be PgChallengeComposite
};
