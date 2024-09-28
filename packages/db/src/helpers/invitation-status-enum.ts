import { mysqlEnum } from "drizzle-orm/mysql-core";

export const InvitationStatusEnum = mysqlEnum("status", [
  "PENDING",
  "ACCEPTED",
  "DENIED",
]);
