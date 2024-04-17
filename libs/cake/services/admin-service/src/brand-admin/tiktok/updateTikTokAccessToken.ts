import { z } from "zod";
import { getTikTokRedirectUrl } from "./getTikTokRedirectUrl";
import { BrandSettings, brands, db } from "@danklabs/cake/db";
import { eq, sql } from "drizzle-orm";
import { clearBrandCache } from "../../brands/getBrand";

const tiktokResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  open_id: z.string(),
  refresh_expires_in: z.number(),
  refresh_token: z.string(),
  scope: z.string(),
  token_type: z.string(),
});

export type TiktokResponse = z.infer<typeof tiktokResponseSchema>;

export async function updateTikTokAccessToken(brandSlug: string, code: string) {
  // Exchange the code for a token
  const request = {
    client_key: process.env["TIKTOK_CLIENT_KEY"]!,
    client_secret: process.env["TIKTOK_APP_SECRET"]!,
    grant_type: "authorization_code",
    redirect_uri: getTikTokRedirectUrl(),
    code,
  };
  console.log("requesting oauth token", request);
  const response = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(request),
  });

  const data = await response.json();

  if (data.error) {
    console.error("error getting tiktok access token", data);
    throw new Error("");
  }

  // Here you should handle the response, save the token, etc.
  console.log("successfully retrieved tiktok token", data);

  const result = tiktokResponseSchema.parse(data);

  const path = `{"tiktok"}`;
  const value: BrandSettings["tiktok"] = {
    status: "active",
    accessToken: result.access_token,
    refreshToken: result.refresh_token,
    expiresIn: result.expires_in,
    openId: result.open_id,
    refreshExpiresIn: result.refresh_expires_in,
    scope: result.scope,
  };

  await db
    .update(brands)
    .set({
      settings: sql`jsonb_set(settings, ${path}, ${value}, true)`,
      updatedAt: new Date(),
    })
    .where(eq(brands.slug, brandSlug));

  clearBrandCache(brandSlug);
}
