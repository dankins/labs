import { profile } from "console";
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
  unique,
  interval,
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
  maxCollectionItems: integer("max_collection_items").notNull(),
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
  accepted: timestamp("accepted"),
  coupon: text("coupon"),
  revshare: numeric("revshare"),
  invitationsGranted: integer("invitations_granted"),
  collectionItemsGranted: integer("collection_items_granted"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const profileParentType = pgEnum("profile_types", ["member", "brand"]);

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  parentType: profileParentType("parent_type").notNull(),
  parentId: uuid("parent_id").unique().notNull(),
  username: text("username").unique().notNull(),
  bio: text("bio"),
  avatar: text("avatar"),
  cover: text("cover"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const connections = pgTable(
  "connections",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    followerId: uuid("follower_id")
      .references(() => profiles.id)
      .notNull(),
    followsId: uuid("follows_id")
      .references(() => profiles.id)
      .notNull(),
    followerIgnored: boolean("follower_ignored"),
    reciprocalId: uuid("reciprocal_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => ({
    connection: unique().on(t.followerId, t.followsId),
  })
);

export type BrandSettings = {
  instagram?:
    | {
        status: "deactivated";
      }
    | {
        status: "active";
        accessToken: string;
        userId: string;
        tokenExpirationDate: string;
      };
  tiktok?:
    | {
        status: "pending";
      }
    | {
        status: "deactivated";
      }
    | {
        status: "active";
        accessToken: string;
        tokenExpirationDate: string;
        openId: string;
        refreshToken: string;
        refreshExpiresIn: number;
        scope: string;
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

export const offerType = pgEnum("offer_types", ["voucher", "event"]);

export const brandOfferTemplates = pgTable("brand_offer_templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  brandId: uuid("brand_id")
    .references(() => brands.id)
    .notNull(),
  applyOnPassCreation: boolean("apply_on_pass_creation").notNull(),
  offerType: offerType("offer_type").notNull(),
  offerValue: numeric("offer_value").default("0").notNull(),
  timeToExpiration: interval("time_to_expiration"),
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
  orderId: text("order_id"),
  expiration: timestamp("expiration"),
  redemptionDate: timestamp("redeption_date"),
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
  profile: one(profiles, {
    fields: [members.id],
    references: [profiles.parentId],
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

export const offerCodesRelations = relations(offerCodes, ({ one }) => ({
  offer: one(offers, {
    fields: [offerCodes.offerId],
    references: [offers.id],
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

export const profileRelations = relations(profiles, ({ one, many }) => ({
  follows: many(connections, { relationName: "follows" }),
  followers: many(connections, { relationName: "follower" }),
  member: one(members, {
    fields: [profiles.parentId],
    references: [members.id],
  }),
  brand: one(brands, {
    fields: [profiles.parentId],
    references: [brands.id],
  }),
}));

export const connectionsRelations = relations(connections, ({ one }) => ({
  follower: one(profiles, {
    fields: [connections.followerId],
    references: [profiles.id],
    relationName: "follower",
  }),
  follows: one(profiles, {
    fields: [connections.followsId],
    references: [profiles.id],
    relationName: "follows",
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
export type BrandOfferTemplate = typeof brandOfferTemplates.$inferSelect;
