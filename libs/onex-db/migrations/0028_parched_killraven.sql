CREATE TABLE IF NOT EXISTS "user"."records" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"challenge_id" integer NOT NULL,
	"activity_id" integer NOT NULL,
	"activity_result_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user"."records" ADD CONSTRAINT "records_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user"."records" ADD CONSTRAINT "records_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "challenge"."challenges"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user"."records" ADD CONSTRAINT "records_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "challenge"."activities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user"."records" ADD CONSTRAINT "records_activity_result_id_activity_results_id_fk" FOREIGN KEY ("activity_result_id") REFERENCES "challenge"."activity_results"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "records_user_id_created_at_index" ON "user"."records" USING btree ("user_id","created_at");