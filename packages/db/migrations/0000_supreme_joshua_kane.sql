CREATE SCHEMA "challenge";
--> statement-breakpoint
CREATE SCHEMA "community";
--> statement-breakpoint
CREATE SCHEMA "user";
--> statement-breakpoint
CREATE TYPE "challenge"."activity_goal" AS ENUM('LOWEST_NUMBER', 'HIGHEST_NUMBER', 'SPECIFIC_TARGET', 'SHORTEST_TIME', 'LONGEST_TIME', 'MOST_IMPROVED');--> statement-breakpoint
CREATE TYPE "challenge"."activity_measurement" AS ENUM('COUNTING', 'DURATION', 'IMPROVEMENT');--> statement-breakpoint
CREATE TYPE "challenge"."activity_type" AS ENUM('REPETITIONS', 'WEIGHTLIFTING', 'TIME_BASED', 'DISTANCE', 'SOCIAL');--> statement-breakpoint
CREATE TYPE "challenge"."activity_units" AS ENUM('KG', 'LB', 'M', 'FT', 'SECONDS', 'MINUTES', 'HOURS', 'MI', 'KM', 'PERCENT', 'NONE');--> statement-breakpoint
CREATE TYPE "challenge"."cadence" AS ENUM('NONE', 'DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY', 'YEARLY');--> statement-breakpoint
CREATE TYPE "challenge"."mode" AS ENUM('BLIND_TRUST', 'VERIFIED_ONLY');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('PENDING', 'ACCEPTED', 'DENIED');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "challenge"."activity_unit" (
	"activity" "challenge"."activity_type" NOT NULL,
	"unit" "challenge"."activity_units" NOT NULL,
	CONSTRAINT "activity_unit_activity_unit_pk" PRIMARY KEY("activity","unit")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "challenge"."activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"challenge_id" integer NOT NULL,
	"type" "challenge"."activity_type" NOT NULL,
	"measurement" "challenge"."activity_measurement" NOT NULL,
	"goal" "challenge"."activity_goal" NOT NULL,
	"target" integer,
	"unit" "challenge"."activity_units" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "challenge"."activity_results" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"activity_id" integer NOT NULL,
	"result" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "challenge"."invitations" (
	"id" serial PRIMARY KEY NOT NULL,
	"challenge_id" integer NOT NULL,
	"inviter_id" integer NOT NULL,
	"invitee_id" integer NOT NULL,
	"status" "status" DEFAULT 'PENDING' NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "challenge"."memberships" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"challenge_id" integer NOT NULL,
	"community_id" integer NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "challenge"."challenges" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"community_id" integer NOT NULL,
	"start_date" timestamp NOT NULL,
	"mode" "challenge"."mode" DEFAULT 'BLIND_TRUST' NOT NULL,
	"cadence" "challenge"."cadence" DEFAULT 'NONE' NOT NULL,
	"end_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "community"."communities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"is_public" boolean DEFAULT true NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"owner_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "communities_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "community"."invitations" (
	"id" serial PRIMARY KEY NOT NULL,
	"community_id" integer NOT NULL,
	"inviter_id" integer NOT NULL,
	"invitee_id" integer NOT NULL,
	"status" "status" DEFAULT 'PENDING' NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "invitations_inviterId_inviteeId_communityId_unique" UNIQUE("inviter_id","invitee_id","community_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "community"."memberships" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"community_id" integer NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL,
	"joined_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "challenge"."measurement_goal" (
	"measurement" "challenge"."activity_measurement" NOT NULL,
	"goal" "challenge"."activity_goal" NOT NULL,
	CONSTRAINT "measurement_goal_measurement_goal_pk" PRIMARY KEY("measurement","goal")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"full_name" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"handle" varchar(255),
	"password" varchar(255) NOT NULL,
	"refresh_token" varchar(1000),
	"avatar_url" varchar(1000),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_handle_unique" UNIQUE("handle")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."activities" ADD CONSTRAINT "activities_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "challenge"."challenges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."activity_results" ADD CONSTRAINT "activity_results_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."activity_results" ADD CONSTRAINT "activity_results_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "challenge"."activities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."invitations" ADD CONSTRAINT "invitations_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "challenge"."challenges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."invitations" ADD CONSTRAINT "invitations_inviter_id_users_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "user"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."invitations" ADD CONSTRAINT "invitations_invitee_id_users_id_fk" FOREIGN KEY ("invitee_id") REFERENCES "user"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."memberships" ADD CONSTRAINT "memberships_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."memberships" ADD CONSTRAINT "memberships_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "challenge"."challenges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."memberships" ADD CONSTRAINT "memberships_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "community"."communities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."challenges" ADD CONSTRAINT "challenges_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "community"."communities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "community"."communities" ADD CONSTRAINT "communities_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "user"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "community"."invitations" ADD CONSTRAINT "invitations_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "community"."communities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "community"."invitations" ADD CONSTRAINT "invitations_inviter_id_users_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "user"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "community"."invitations" ADD CONSTRAINT "invitations_invitee_id_users_id_fk" FOREIGN KEY ("invitee_id") REFERENCES "user"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "community"."memberships" ADD CONSTRAINT "memberships_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "community"."memberships" ADD CONSTRAINT "memberships_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "community"."communities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "memberships_user_id_challenge_id_index" ON "challenge"."memberships" USING btree ("user_id","challenge_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "challenges_name_index" ON "challenge"."challenges" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "challenges_community_id_index" ON "challenge"."challenges" USING btree ("community_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "challenges_start_date_end_date_index" ON "challenge"."challenges" USING btree ("start_date","end_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "communities_name_index" ON "community"."communities" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "memberships_user_id_community_id_index" ON "community"."memberships" USING btree ("user_id","community_id");