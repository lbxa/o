DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('PENDING', 'ACCEPTED', 'DECLINED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "challenge"."invitations" ADD COLUMN "status" "status" DEFAULT 'PENDING' NOT NULL;--> statement-breakpoint
ALTER TABLE "community"."invitations" ADD COLUMN "status" "status" DEFAULT 'PENDING' NOT NULL;--> statement-breakpoint
ALTER TABLE "user"."friendships" ADD COLUMN "status" "status" DEFAULT 'PENDING' NOT NULL;