ALTER TABLE "offers" ADD COLUMN "order_id" text;--> statement-breakpoint
ALTER TABLE "offers" ADD COLUMN "redeption_date" timestamp;

create index members_iam ON members(iam);
create index offer_codes_code ON offer_codes(code);