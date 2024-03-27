DO $$ BEGIN
 CREATE TYPE "membership_statuses" AS ENUM('active', 'expired');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "stripe_subscription_id" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "membership_status" "membership_statuses";