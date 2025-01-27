import type { User as PgUser, UserStreak as PgUserStreak } from "@o/db";

export type PgUserStreakComposite = PgUserStreak & {
  user: PgUser;
};
