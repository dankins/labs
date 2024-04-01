CREATE TABLE IF NOT EXISTS "invitation_campaigns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"invitations_granted" integer NOT NULL,
	"collection_items_granted" integer NOT NULL,
	"revshare" numeric,
	"coupon" text,
	"member_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "invitation_campaigns_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "invitations" ADD COLUMN "campaign_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitations" ADD CONSTRAINT "invitations_campaign_id_invitation_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "invitation_campaigns"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "invitations" DROP COLUMN IF EXISTS "campaign";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitation_campaigns" ADD CONSTRAINT "invitation_campaigns_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
