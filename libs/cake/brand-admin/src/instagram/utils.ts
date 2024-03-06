export function buildRedirectUri() {
  const host = process.env["NEXT_PUBLIC_SITE_URL"]?.startsWith("https")
    ? process.env["NEXT_PUBLIC_SITE_URL"]!
    : process.env["INSTAGRAM_REDIRECT_HOST"];

  return host + `instagram_callback`;
}

export function buildInstagramAuthorizeUrl(slug: string) {
  const redirectURI = buildRedirectUri();
  const clientId = process.env["INSTAGRAM_APP_ID"];
  const scope = "user_profile,user_media";

  return `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scope}&response_type=code&state=${slug}`;
}
