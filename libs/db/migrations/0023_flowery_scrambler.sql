ALTER TABLE "challenge"."invitations" DROP CONSTRAINT "invitations_inviter_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "challenge"."invitations" DROP CONSTRAINT "invitations_invitee_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "community"."invitations" DROP CONSTRAINT "invitations_inviter_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "community"."invitations" DROP CONSTRAINT "invitations_invitee_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."invitations" ADD CONSTRAINT "invitations_inviter_id_users_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "user"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenge"."invitations" ADD CONSTRAINT "invitations_invitee_id_users_id_fk" FOREIGN KEY ("invitee_id") REFERENCES "user"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "community"."invitations" ADD CONSTRAINT "invitations_inviter_id_users_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "user"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "community"."invitations" ADD CONSTRAINT "invitations_invitee_id_users_id_fk" FOREIGN KEY ("invitee_id") REFERENCES "user"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
