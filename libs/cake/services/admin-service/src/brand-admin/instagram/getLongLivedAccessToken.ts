import { getInstagramRedirectUrl } from "./getInstagramRedirectUrl";
import { updateInstagramConfig } from "./updateInstagramConfig";

export async function getLongLivedAccessToken(slug: string, code: string) {
  const clientSecret = process.env["INSTAGRAM_APP_SECRET"]!;

  // Exchange the code for a short lived token
  const request = {
    client_id: process.env["INSTAGRAM_APP_ID"]!,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    redirect_uri: getInstagramRedirectUrl(),
    code,
  };
  const response = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(request),
  });

  const data = await response.json();

  if (data.error) {
    console.error("error getting short lived access token", data.error);
    throw new Error("error getting short lived access token");
  }

  // exchange the short lived access token for a long lived access token
  const grantType = "ig_exchange_token";
  const accessToken = data.access_token;

  console.log("requesting long lived access token");
  const longLivedResponse = await fetch(
    `https://graph.instagram.com/access_token?grant_type=${grantType}&client_secret=${clientSecret}&access_token=${accessToken}`,
    {
      method: "GET",
    }
  );
  const longLivedData = await longLivedResponse.json();
  if (longLivedData.error) {
    console.error("error getting long lived access token", longLivedData.error);
    throw new Error("error getting long lived access token");
  }

  const expiresInSeconds = longLivedData.expires_in;
  const tokenExpirationDate = new Date(Date.now() + expiresInSeconds * 1000);

  await updateInstagramConfig(
    slug,
    longLivedData.access_token,
    data.user_id,
    tokenExpirationDate
  );
}
