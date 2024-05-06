import { db, profiles } from "@danklabs/cake/db";
import { isNotNull } from "drizzle-orm";

export async function recommendConnections(iam: string) {
  const result = await db.query.profiles.findMany({
    where: isNotNull(profiles.username),
  });
  return result.map((r) => ({ username: r.username }));
}
