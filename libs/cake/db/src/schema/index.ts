import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
  pgEnum,
  numeric,
  jsonb,
} from "drizzle-orm/pg-core";

export const membershipStatuses = pgEnum("membership_statuses", [
  "active",
  "expired",
]);

export const members = pgTable("members", {
  id: uuid("id").primaryKey().defaultRandom(),
  iam: text("iam").unique().notNull(),
  invitationId: uuid("invitation_id"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  membershipStatus: membershipStatuses("membership_status"),
  invitedBy: uuid("invited_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const invitationCampaigns = pgTable("invitation_campaigns", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  name: text("name").notNull(),
  invitationsGranted: integer("invitations_granted").notNull(),
  collectionItemsGranted: integer("collection_items_granted").notNull(),
  revshare: numeric("revshare"),
  coupon: text("coupon"),
  memberId: uuid("member_id").references(() => members.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const invitations = pgTable("invitations", {
  id: uuid("id").primaryKey().defaultRandom(),
  campaignId: uuid("campaign_id").references(() => invitationCampaigns.id),
  memberId: uuid("member_id").references(() => members.id),
  tranche: text("tranche"),
  recipientName: text("recipient_name"),
  redemptions: integer("redemptions").notNull().default(0),
  maxRedemptions: integer("max_redemptions").notNull(),
  code: text("code").unique(),
  expiration: timestamp("expiration"),
  coupon: text("coupon"),
  revshare: numeric("revshare"),
  invitationsGranted: integer("invitations_granted"),
  collectionItemsGranted: integer("collection_items_granted"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type BrandSettings = {
  instagram?: {
    status: "active" | "pending" | "deactivated";
    accessToken?: string;
    userId?: string;
  };
  tiktok?: {
    status: "active" | "pending";
    accessToken?: string;
    userId?: string;
  };
};

export const brandStatus = pgEnum("brand_statuses", [
  "draft",
  "active",
  "paused",
  "deactivated",
]);
export const brands = pgTable("brands", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  cmsId: text("cms_id").unique(),
  status: brandStatus("status").notNull().default("draft"),
  admins: jsonb("admins").$type<{ email: string; role: "admin" }[]>().notNull(),
  settings: jsonb("settings").$type<BrandSettings>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const offerType = pgEnum("offer_types", ["voucher"]);

export const brandOfferTemplates = pgTable("brand_offer_templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  brandId: uuid("brand_id")
    .references(() => brands.id)
    .notNull(),
  applyOnPassCreation: boolean("apply_on_pass_creation").notNull(),
  offerType: offerType("offer_type").notNull(),
  offerValue: numeric("offer_value").default("0").notNull(),
  name: text("name"),
  description: numeric("description"),
  finePrint: numeric("fine_print"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const passports = pgTable("passports", {
  id: uuid("id").primaryKey().defaultRandom(),
  memberId: uuid("member_id")
    .references(() => members.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const passes = pgTable("passes", {
  id: uuid("id").primaryKey().defaultRandom(),
  passportId: uuid("passport_id")
    .references(() => passports.id)
    .notNull(),
  brandId: uuid("brand_id")
    .references(() => brands.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const offerStatus = pgEnum("offer_statuses", [
  "new",
  "redeemed",
  "archived",
]);

export const offers = pgTable("offers", {
  id: uuid("id").primaryKey().defaultRandom(),
  passId: uuid("pass_id")
    .references(() => passes.id)
    .notNull(),
  templateId: uuid("template_id")
    .references(() => brandOfferTemplates.id)
    .notNull(),
  status: offerStatus("status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const offerCodes = pgTable("offer_codes", {
  id: uuid("id").primaryKey().defaultRandom(),
  templateId: uuid("template_id")
    .references(() => brandOfferTemplates.id)
    .notNull(),
  offerId: uuid("offer_id").references(() => offers.id),
  code: text("code").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const favorites = pgTable("favorites", {
  id: uuid("id").primaryKey().defaultRandom(),
  memberId: uuid("member_id")
    .references(() => members.id)
    .notNull(),
  brandId: uuid("brand_id")
    .references(() => brands.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const superAdminRoles = pgEnum("super_admin_roles", ["super_admin"]);

export const superAdmins = pgTable("super_admins", {
  id: uuid("id").primaryKey().defaultRandom(),
  iam: text("iam").unique().notNull(),
  role: superAdminRoles("role").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// RELATIONS
export const membersRelations = relations(members, ({ many, one }) => ({
  invitations: many(invitations),
  favorites: many(favorites),
  passport: one(passports, {
    fields: [members.id],
    references: [passports.memberId],
  }),
}));

export const offerTemplateRelations = relations(
  brandOfferTemplates,
  ({ one }) => ({
    brand: one(brands, {
      fields: [brandOfferTemplates.brandId],
      references: [brands.id],
    }),
  })
);

export const brandsRelations = relations(brands, ({ many }) => ({
  offerTemplates: many(brandOfferTemplates),
}));

export const passesRelations = relations(passes, ({ one, many }) => ({
  passport: one(passports, {
    fields: [passes.passportId],
    references: [passports.id],
  }),
  brand: one(brands, {
    fields: [passes.brandId],
    references: [brands.id],
  }),
  offers: many(offers),
}));

export const passportRelations = relations(passports, ({ one, many }) => ({
  passes: many(passes),
  member: one(members, {
    fields: [passports.memberId],
    references: [members.id],
  }),
}));

export const invitationRelations = relations(invitations, ({ one }) => ({
  member: one(members, {
    fields: [invitations.memberId],
    references: [members.id],
  }),
  campaign: one(invitationCampaigns, {
    fields: [invitations.campaignId],
    references: [invitationCampaigns.id],
  }),
}));

export const offerRelations = relations(offers, ({ one }) => ({
  template: one(brandOfferTemplates, {
    fields: [offers.templateId],
    references: [brandOfferTemplates.id],
  }),
  code: one(offerCodes, {
    fields: [offers.id],
    references: [offerCodes.offerId],
  }),
  pass: one(passes, {
    fields: [offers.passId],
    references: [passes.id],
  }),
}));

export const favoritesRelations = relations(favorites, ({ one, many }) => ({
  member: one(members, {
    fields: [favorites.memberId],
    references: [members.id],
  }),
  brand: one(brands, {
    fields: [favorites.brandId],
    references: [brands.id],
  }),
}));

// TYPES
export type Brand = typeof brands.$inferSelect;
export type Invitation = typeof invitations.$inferSelect;
export type InvitationCampaign = typeof invitationCampaigns.$inferSelect;
export type Member = typeof members.$inferSelect;
export type Passport = typeof passports.$inferSelect;
export type Offer = typeof offers.$inferSelect;
export type OfferCode = typeof offerCodes.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
