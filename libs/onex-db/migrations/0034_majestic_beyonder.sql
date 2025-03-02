ALTER TABLE "user"."users" ALTER COLUMN "avatar_url" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "community"."communities" ADD COLUMN "image_url" jsonb;