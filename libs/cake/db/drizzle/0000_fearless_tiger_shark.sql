CREATE TABLE IF NOT EXISTS "invitations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	CONSTRAINT "invitations_code_unique" UNIQUE("code")
);
