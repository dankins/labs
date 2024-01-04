CREATE TABLE IF NOT EXISTS "offer_codes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"template_id" uuid NOT NULL,
	"offer_id" uuid,
	"code" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "brand_offer_templates" ALTER COLUMN "apply_on_pass_creation" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "brand_offer_templates" ALTER COLUMN "offer_type" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "offer_codes" ADD CONSTRAINT "offer_codes_template_id_brand_offer_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "brand_offer_templates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "offer_codes" ADD CONSTRAINT "offer_codes_offer_id_offers_id_fk" FOREIGN KEY ("offer_id") REFERENCES "offers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
