ALTER TABLE "invitations" ADD COLUMN "campaign" text;--> statement-breakpoint
ALTER TABLE "invitations" ADD COLUMN "revshare" numeric;--> statement-breakpoint
ALTER TABLE "invitations" ADD COLUMN "invitations_granted" integer;--> statement-breakpoint
ALTER TABLE "invitations" ADD COLUMN "collection_items_granted" integer;