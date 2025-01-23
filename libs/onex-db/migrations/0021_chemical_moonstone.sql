ALTER TABLE "challenge"."invitations" DROP COLUMN IF EXISTS "status";--> statement-breakpoint
ALTER TABLE "community"."invitations" DROP COLUMN IF EXISTS "status";--> statement-breakpoint
ALTER TABLE "user"."friendships" DROP COLUMN IF EXISTS "status";

-- Drop the existing enum
DROP TYPE "status";