CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` varchar(255) NOT NULL,
	`handle` varchar(255),
	`password` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_handle_unique` UNIQUE(`handle`)
);
