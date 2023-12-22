ALTER TABLE "invitations" DROP CONSTRAINT "invitations_claimed_by_member_id_unique";--> statement-breakpoint
ALTER TABLE "members" DROP CONSTRAINT "members_code_unique";--> statement-breakpoint
ALTER TABLE "invitations" DROP CONSTRAINT "invitations_sender_member_id_members_id_fk";
--> statement-breakpoint
ALTER TABLE "invitations" DROP CONSTRAINT "invitations_claimed_by_member_id_members_id_fk";
--> statement-breakpoint
ALTER TABLE "invitations" ALTER COLUMN "code" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "invitations" ADD COLUMN "expiration" timestamp;--> statement-breakpoint
ALTER TABLE "invitations" ADD COLUMN "redemptions" integer;--> statement-breakpoint
ALTER TABLE "invitations" ADD COLUMN "max_redemptions" integer;--> statement-breakpoint
ALTER TABLE "invitations" ADD COLUMN "coupon" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "invitation_code" uuid;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "invited_by" uuid;--> statement-breakpoint
ALTER TABLE "invitations" DROP COLUMN IF EXISTS "claimed_by_member_id";--> statement-breakpoint
ALTER TABLE "members" DROP COLUMN IF EXISTS "code";
ALTER TABLE "members" ADD COLUMN "iam" text;--> statement-breakpoint