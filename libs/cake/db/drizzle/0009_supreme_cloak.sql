ALTER TABLE "brand_offer_templates" ADD COLUMN "offer_value" numeric DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "brand_offer_templates" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "brand_offer_templates" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "brand_offer_templates" ADD COLUMN "fine_print" text;--> statement-breakpoint