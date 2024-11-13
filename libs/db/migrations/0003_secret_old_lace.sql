ALTER TABLE "challenge"."activity_results" ADD COLUMN "challenge_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."activity_results" ADD CONSTRAINT "activity_results_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "challenge"."challenges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
