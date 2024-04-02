ALTER TABLE "members" ADD COLUMN "max_collection_items" integer;
update members set max_collection_items = 10;
alter table "members" ALTER COLUMN "max_collection_items" set not null;