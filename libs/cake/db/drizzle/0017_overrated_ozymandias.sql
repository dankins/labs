DO $$ BEGIN
 CREATE TYPE "brand_statuses" AS ENUM('draft', 'active', 'paused', 'deactivated');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "status" "brand_statuses" DEFAULT 'draft' NOT NULL;