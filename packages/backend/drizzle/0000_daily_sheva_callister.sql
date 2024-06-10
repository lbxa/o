CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`first_name` text,
	`last_name` text,
	`email` text,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
