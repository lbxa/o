ALTER TABLE "user"."users" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_unique_index" ON "user"."users" USING btree (lower("email"));