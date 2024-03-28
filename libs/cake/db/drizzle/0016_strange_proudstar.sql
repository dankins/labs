ALTER TABLE "brands" ADD COLUMN "cms_id" text;--> statement-breakpoint
ALTER TABLE "brands" ADD CONSTRAINT "brands_cms_id_unique" UNIQUE("cms_id");