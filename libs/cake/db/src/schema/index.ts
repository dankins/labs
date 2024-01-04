import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

export const members = pgTable("members", {
  id: uuid("id").primaryKey().defaultRandom(),
  iam: text("iam").unique().notNull(),
  invitationId: uuid("invitation_id"),
  invitedBy: uuid("invited_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const invitations = pgTable("invitations", {
  id: uuid("id").primaryKey().defaultRandom(),
  memberId: uuid("member_id").references(() => members.id),
  redemptions: integer("redemptions").notNull().default(0),
  maxRedemptions: integer("max_redemptions").notNull(),
  code: text("code").unique(),
  expiration: timestamp("expiration"),
  coupon: text("coupon"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const brands = pgTable("brands", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
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

// TYPES
export type Invitation = typeof invitations.$inferSelect;
export type Member = typeof members.$inferSelect;
export type Passport = typeof passports.$inferSelect;

// RELATIONS
export const membersRelations = relations(members, ({ many, one }) => ({
  invitations: many(invitations),
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

export const passesRelations = relations(passes, ({ one }) => ({
  passport: one(passports, {
    fields: [passes.passportId],
    references: [passports.id],
  }),
  brand: one(brands, {
    fields: [passes.brandId],
    references: [brands.id],
  }),
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
}));
