ALTER TABLE "invitations" RENAME COLUMN "sender_member_id" TO "member_id";--> statement-breakpoint
ALTER TABLE "members" RENAME COLUMN "invitation_code" TO "invitation_id";--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "iam" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitations" ADD CONSTRAINT "invitations_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_iam_unique" UNIQUE("iam");