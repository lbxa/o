ALTER TABLE `users` MODIFY COLUMN `first_name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `last_name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `password` varchar(255) NOT NULL;