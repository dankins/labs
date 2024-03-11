export function getInstagramRedirectUrl() {
  const host = process.env["NEXT_PUBLIC_SITE_URL"]?.startsWith("https")
    ? process.env["NEXT_PUBLIC_SITE_URL"]!
    : process.env["INSTAGRAM_REDIRECT_HOST"];

  return host + `instagram_callback`;
}
