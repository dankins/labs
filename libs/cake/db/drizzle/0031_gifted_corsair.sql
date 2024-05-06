DO $$ BEGIN
 CREATE TYPE "profile_types" AS ENUM('member', 'brand');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parent_type" "profile_types" NOT NULL,
	"parent_id" uuid NOT NULL,
	"username" text NOT NULL,
	"bio" text,
	"avatar" text,
	"cover" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "connections" RENAME COLUMN "member_id" TO "follows_id";--> statement-breakpoint
ALTER TABLE "connections" DROP CONSTRAINT "connections_member_id_follower_id_unique";--> statement-breakpoint
ALTER TABLE "members" DROP CONSTRAINT "members_username_unique";--> statement-breakpoint
ALTER TABLE "connections" DROP CONSTRAINT "connections_follower_id_members_id_fk";
--> statement-breakpoint
ALTER TABLE "connections" DROP CONSTRAINT "connections_member_id_members_id_fk";
--> statement-breakpoint
ALTER TABLE "brand_offer_templates" ALTER COLUMN "time_to_expiration" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "connections" ADD COLUMN "follower_ignored" boolean;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "connections" ADD CONSTRAINT "connections_follower_id_profiles_id_fk" FOREIGN KEY ("follower_id") REFERENCES "profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "connections" ADD CONSTRAINT "connections_follows_id_profiles_id_fk" FOREIGN KEY ("follows_id") REFERENCES "profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "members" DROP COLUMN IF EXISTS "username";--> statement-breakpoint
ALTER TABLE "connections" ADD CONSTRAINT "connections_follower_id_follows_id_unique" UNIQUE("follower_id","follows_id");