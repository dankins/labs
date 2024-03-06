ALTER TABLE "brands" ADD COLUMN "admins" jsonb;
update "brands" set admins = '[]';
alter table "brands" alter column "admins" set not null;


