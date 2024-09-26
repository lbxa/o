CREATE TABLE `communities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`is_public` boolean NOT NULL DEFAULT true,
	`owner_id` int NOT NULL,
	CONSTRAINT `communities_id` PRIMARY KEY(`id`),
	CONSTRAINT `communities_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `community_invitations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`community_id` int NOT NULL,
	`invited_user_id` int NOT NULL,
	`invited_by_user_id` int NOT NULL,
	`status` varchar(50) NOT NULL DEFAULT 'pending',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `community_invitations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_communities` (
	`user_id` int NOT NULL,
	`community_id` int NOT NULL,
	CONSTRAINT `user_communities_user_id_community_id_pk` PRIMARY KEY(`user_id`,`community_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` varchar(255) NOT NULL,
	`handle` varchar(255),
	`password` varchar(255) NOT NULL,
	`refreshToken` varchar(1000),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_handle_unique` UNIQUE(`handle`)
);
--> statement-breakpoint
ALTER TABLE `communities` ADD CONSTRAINT `communities_owner_id_users_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `community_invitations` ADD CONSTRAINT `community_invitations_community_id_communities_id_fk` FOREIGN KEY (`community_id`) REFERENCES `communities`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `community_invitations` ADD CONSTRAINT `community_invitations_invited_user_id_users_id_fk` FOREIGN KEY (`invited_user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `community_invitations` ADD CONSTRAINT `community_invitations_invited_by_user_id_users_id_fk` FOREIGN KEY (`invited_by_user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_communities` ADD CONSTRAINT `user_communities_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_communities` ADD CONSTRAINT `user_communities_community_id_communities_id_fk` FOREIGN KEY (`community_id`) REFERENCES `communities`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `name_idx` ON `communities` (`name`);--> statement-breakpoint
CREATE INDEX `community_invited_user_idx` ON `community_invitations` (`community_id`,`invited_user_id`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `handle_idx` ON `users` (`handle`);