import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { members } from "./members";

export const invitations = pgTable("invitations", {
  id: uuid("id").primaryKey(),
  senderMemberId: uuid("sender_member_id").references(() => members.id),
  code: text("code").unique().notNull(),
  claimedByMemberId: uuid("claimed_by_member_id")
    .unique()
    .references(() => members.id),
});

export type Invitation = typeof invitations.$inferSelect;
