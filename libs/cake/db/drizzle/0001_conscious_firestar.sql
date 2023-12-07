CREATE TABLE IF NOT EXISTS "members" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	CONSTRAINT "members_code_unique" UNIQUE("code")
);
--> statement-breakpoint
ALTER TABLE "invitations" ADD COLUMN "sender_member_id" uuid;--> statement-breakpoint
ALTER TABLE "invitations" ADD COLUMN "claimed_by_member_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitations" ADD CONSTRAINT "invitations_sender_member_id_members_id_fk" FOREIGN KEY ("sender_member_id") REFERENCES "members"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitations" ADD CONSTRAINT "invitations_claimed_by_member_id_members_id_fk" FOREIGN KEY ("claimed_by_member_id") REFERENCES "members"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_claimed_by_member_id_unique" UNIQUE("claimed_by_member_id");