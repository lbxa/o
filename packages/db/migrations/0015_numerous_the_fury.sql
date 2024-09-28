ALTER TABLE `communities` ADD `created_at` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `communities` ADD `updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP;