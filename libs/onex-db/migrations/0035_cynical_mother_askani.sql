CREATE SCHEMA "chat";
--> statement-breakpoint
CREATE TYPE "chat"."chat_type" AS ENUM('DM', 'GROUP');--> statement-breakpoint
CREATE TABLE "chat"."members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chat_id" uuid NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "chat"."messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chat_id" uuid NOT NULL,
	"sender_id" integer NOT NULL,
	"content" text NOT NULL,
	"delivered_at" timestamp (6) with time zone,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "chat"."read_receipts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message_id" uuid NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "chat"."chats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "chat"."chat_type" NOT NULL,
	"name" varchar(100),
	"max_participants" integer DEFAULT 50,
	"last_message_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "chat"."members" ADD CONSTRAINT "members_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "chat"."chats"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat"."members" ADD CONSTRAINT "members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat"."messages" ADD CONSTRAINT "messages_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "chat"."chats"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat"."messages" ADD CONSTRAINT "messages_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "user"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat"."read_receipts" ADD CONSTRAINT "read_receipts_message_id_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "chat"."messages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat"."read_receipts" ADD CONSTRAINT "read_receipts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "members_user_id_index" ON "chat"."members" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "members_chat_id_index" ON "chat"."members" USING btree ("chat_id");--> statement-breakpoint
CREATE INDEX "messages_chat_id_created_at_index" ON "chat"."messages" USING btree ("chat_id","created_at");--> statement-breakpoint
CREATE INDEX "messages_sender_id_index" ON "chat"."messages" USING btree ("sender_id");--> statement-breakpoint
CREATE INDEX "messages_created_at_index" ON "chat"."messages" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "read_receipts_message_id_user_id_index" ON "chat"."read_receipts" USING btree ("message_id","user_id");--> statement-breakpoint
CREATE INDEX "read_receipts_user_id_created_at_index" ON "chat"."read_receipts" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "chats_created_at_index" ON "chat"."chats" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "chats_name_index" ON "chat"."chats" USING btree ("name");