export async function refreshInstagramToken(accessToken: string) {
  console.log("refreshing instagram token");
  const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log("Refreshed token data:", data);
  if (data.error.code === 190) {
    throw new Error("unable to refresh token - expired");
  }
  return data.access_token; // This is your refreshed long-lived token
}
