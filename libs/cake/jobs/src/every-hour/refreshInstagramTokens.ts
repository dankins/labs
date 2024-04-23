import { db } from "@danklabs/cake/db";
import { brandAdmin } from "@danklabs/cake/services/admin-service";
import { eq, sql } from "drizzle-orm";
import dayjs from "dayjs";

export async function refreshInstagramTokens() {
  console.log("executing Refresh Instagram Tokens");

  const brandsWithInstagramConfigured = await db.query.brands.findMany({
    where: eq(sql`settings->'instagram'->>'status'`, "active"),
  });

  await Promise.all(
    brandsWithInstagramConfigured.map(async (brand) => {
      if (
        !brand.settings.instagram ||
        brand.settings.instagram.status !== "active"
      ) {
        return;
      }
      const { accessToken, userId, tokenExpirationDate } =
        brand.settings.instagram;

      const expires = dayjs(tokenExpirationDate);
      const startRefreshPeriod = expires.subtract(7, "days");

      if (dayjs().isAfter(startRefreshPeriod)) {
        // token is within 7 days of expiring, so let's refresh it
        console.log("updating access token for brand", brand.slug);
        await brandAdmin.instagram.refreshInstagramToken(
          brand.slug,
          accessToken,
          userId
        );
      }
    })
  );

  return { success: true };
}
