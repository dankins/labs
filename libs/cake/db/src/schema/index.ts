import { relations } from "drizzle-orm";
import { pgTable, uuid, text, timestamp, integer } from "drizzle-orm/pg-core";

export const members = pgTable("members", {
  id: uuid("id").primaryKey().defaultRandom(),
  iam: text("iam").unique().notNull(),
  invitationId: uuid("invitation_id"),
  invitedBy: uuid("invited_by"),
});

export const invitations = pgTable("invitations", {
  id: uuid("id").primaryKey().defaultRandom(),
  memberId: uuid("member_id").references(() => members.id),
  redemptions: integer("redemptions").notNull().default(0),
  maxRedemptions: integer("max_redemptions").notNull(),
  code: text("code").unique(),
  expiration: timestamp("expiration"),
  coupon: text("coupon"),
});

export const invitationRelations = relations(invitations, ({ one }) => ({
  member: one(members, {
    fields: [invitations.memberId],
    references: [members.id],
  }),
}));

export const memberRelations = relations(members, ({ many }) => ({
  invitations: many(invitations),
}));

export type Invitation = typeof invitations.$inferSelect;
export type Member = typeof members.$inferSelect;
