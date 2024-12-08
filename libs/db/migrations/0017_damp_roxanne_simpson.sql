ALTER TABLE "challenge"."activities" DROP CONSTRAINT "activities_challenge_id_challenges_id_fk";
--> statement-breakpoint
ALTER TABLE "challenge"."activity_results" DROP CONSTRAINT "activity_results_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "challenge"."activity_results" DROP CONSTRAINT "activity_results_activity_id_activities_id_fk";
--> statement-breakpoint
ALTER TABLE "challenge"."activity_results" DROP CONSTRAINT "activity_results_challenge_id_challenges_id_fk";
--> statement-breakpoint
ALTER TABLE "challenge"."invitations" DROP CONSTRAINT "invitations_challenge_id_challenges_id_fk";
--> statement-breakpoint
ALTER TABLE "challenge"."memberships" DROP CONSTRAINT "memberships_challenge_id_challenges_id_fk";
--> statement-breakpoint
ALTER TABLE "challenge"."challenges" DROP CONSTRAINT "challenges_community_id_communities_id_fk";
--> statement-breakpoint
ALTER TABLE "community"."invitations" DROP CONSTRAINT "invitations_community_id_communities_id_fk";
--> statement-breakpoint
ALTER TABLE "community"."memberships" DROP CONSTRAINT "memberships_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "community"."memberships" DROP CONSTRAINT "memberships_community_id_communities_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."activities" ADD CONSTRAINT "activities_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "challenge"."challenges"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."activity_results" ADD CONSTRAINT "activity_results_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."activity_results" ADD CONSTRAINT "activity_results_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "challenge"."activities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."activity_results" ADD CONSTRAINT "activity_results_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "challenge"."challenges"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."invitations" ADD CONSTRAINT "invitations_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "challenge"."challenges"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."memberships" ADD CONSTRAINT "memberships_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "challenge"."challenges"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."challenges" ADD CONSTRAINT "challenges_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "community"."communities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "community"."invitations" ADD CONSTRAINT "invitations_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "community"."communities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "community"."memberships" ADD CONSTRAINT "memberships_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "community"."memberships" ADD CONSTRAINT "memberships_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "community"."communities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
