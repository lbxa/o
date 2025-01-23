ALTER TABLE "user"."friendships" DROP CONSTRAINT "friendships_user_id_friend_id_pk";--> statement-breakpoint
ALTER TABLE "user"."friendships" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "user"."friendships" ADD CONSTRAINT "friendships_userId_friendId_unique" UNIQUE("user_id","friend_id");