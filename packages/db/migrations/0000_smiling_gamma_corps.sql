CREATE TABLE `challenge_invitations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`challenge_id` int NOT NULL,
	`inviter_id` int NOT NULL,
	`invitee_id` int NOT NULL,
	`status` varchar(20) NOT NULL DEFAULT 'pending',
	`expires_at` timestamp,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `challenge_invitations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `challenge_memberships` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`challenge_id` int NOT NULL,
	`community_id` int NOT NULL,
	`joined_at` timestamp DEFAULT (now()),
	CONSTRAINT `challenge_memberships_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `challenges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`community_id` int NOT NULL,
	`start_date` timestamp NOT NULL,
	`end_date` timestamp NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `challenges_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `communities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`is_public` boolean NOT NULL DEFAULT true,
	`is_verified` boolean NOT NULL DEFAULT false,
	`owner_id` int NOT NULL,
	CONSTRAINT `communities_id` PRIMARY KEY(`id`),
	CONSTRAINT `communities_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `community_invitations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`community_id` int NOT NULL,
	`inviter_id` int NOT NULL,
	`invitee_id` int NOT NULL,
	`status` varchar(20) NOT NULL DEFAULT 'pending',
	`expires_at` timestamp,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `community_invitations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `community_memberships` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`community_id` int NOT NULL,
	`is_admin` boolean NOT NULL DEFAULT false,
	`joined_at` timestamp DEFAULT (now()),
	CONSTRAINT `community_memberships_id` PRIMARY KEY(`id`)
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
	`avatar_url` varchar(1000),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_handle_unique` UNIQUE(`handle`)
);
--> statement-breakpoint
ALTER TABLE `challenge_invitations` ADD CONSTRAINT `challenge_invitations_challenge_id_challenges_id_fk` FOREIGN KEY (`challenge_id`) REFERENCES `challenges`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `challenge_invitations` ADD CONSTRAINT `challenge_invitations_inviter_id_users_id_fk` FOREIGN KEY (`inviter_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `challenge_invitations` ADD CONSTRAINT `challenge_invitations_invitee_id_users_id_fk` FOREIGN KEY (`invitee_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `challenge_memberships` ADD CONSTRAINT `challenge_memberships_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `challenge_memberships` ADD CONSTRAINT `challenge_memberships_challenge_id_challenges_id_fk` FOREIGN KEY (`challenge_id`) REFERENCES `challenges`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `challenge_memberships` ADD CONSTRAINT `challenge_memberships_community_id_communities_id_fk` FOREIGN KEY (`community_id`) REFERENCES `communities`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `challenges` ADD CONSTRAINT `challenges_community_id_communities_id_fk` FOREIGN KEY (`community_id`) REFERENCES `communities`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `communities` ADD CONSTRAINT `communities_owner_id_users_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `community_invitations` ADD CONSTRAINT `community_invitations_community_id_communities_id_fk` FOREIGN KEY (`community_id`) REFERENCES `communities`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `community_invitations` ADD CONSTRAINT `community_invitations_inviter_id_users_id_fk` FOREIGN KEY (`inviter_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `community_invitations` ADD CONSTRAINT `community_invitations_invitee_id_users_id_fk` FOREIGN KEY (`invitee_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `community_memberships` ADD CONSTRAINT `community_memberships_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `community_memberships` ADD CONSTRAINT `community_memberships_community_id_communities_id_fk` FOREIGN KEY (`community_id`) REFERENCES `communities`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `user_challenge_unique` ON `challenge_memberships` (`user_id`,`challenge_id`);--> statement-breakpoint
CREATE INDEX `challenge_name_idx` ON `challenges` (`name`);--> statement-breakpoint
CREATE INDEX `challenge_date_idx` ON `challenges` (`start_date`,`end_date`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `communities` (`name`);--> statement-breakpoint
CREATE INDEX `user_community_unique` ON `community_memberships` (`user_id`,`community_id`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `handle_idx` ON `users` (`handle`);