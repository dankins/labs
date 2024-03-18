ALTER TABLE "brands" ALTER COLUMN "admins" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "settings" jsonb;
update "brands" set settings = '{}';
alter table "brands" alter column "settings" set not null;


