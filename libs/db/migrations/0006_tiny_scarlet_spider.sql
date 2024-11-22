ALTER TABLE "challenge"."challenges" ADD COLUMN "owner_id" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."challenges" ADD CONSTRAINT "challenges_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "user"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
