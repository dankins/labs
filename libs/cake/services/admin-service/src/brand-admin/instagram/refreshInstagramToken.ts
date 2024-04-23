import { updateInstagramConfig } from "./updateInstagramConfig";

export async function refreshInstagramToken(
  slug: string,
  accessToken: string,
  userId: string
) {
  console.log("refreshing instagram token", slug);
  const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`;

  const response = await fetch(url);
  const data = await response.json();
  if (data.error) {
    console.error("unable to refresh token", data.error);
    if (data.error.code === 190) {
      throw new Error("unable to refresh token - expired");
    }
    throw new Error("unable to refresh token");
  }
  console.log("Refreshed token data:", data);

  const expiresInSeconds = data.expires_in;
  const tokenExpirationDate = new Date(Date.now() + expiresInSeconds * 1000);

  await updateInstagramConfig(
    slug,
    data.access_token,
    userId,
    tokenExpirationDate
  );
}
