ALTER TABLE "brand_offer_templates" ADD COLUMN "time_to_expiration" interval;--> statement-breakpoint
ALTER TABLE "invitations" ADD COLUMN "accepted" timestamp;--> statement-breakpoint
ALTER TABLE "offers" ADD COLUMN "expiration" timestamp;