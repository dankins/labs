ALTER TABLE "invitations" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "invitations" ALTER COLUMN "redemptions" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "invitations" ALTER COLUMN "redemptions" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "invitations" ALTER COLUMN "max_redemptions" SET NOT NULL;