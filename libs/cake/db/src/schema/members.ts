import { pgTable, uuid, text } from "drizzle-orm/pg-core";

export const members = pgTable("members", {
  id: uuid("id").primaryKey(),
  code: text("code").unique().notNull(),
});
