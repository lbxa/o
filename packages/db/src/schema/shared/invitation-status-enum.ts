import { pgEnum } from "drizzle-orm/pg-core";

// by default part of the public schema
export const InvitationStatus = pgEnum("status", [
  "PENDING",
  "ACCEPTED",
  "DENIED",
]);
