export function getTikTokRedirectUrl() {
  const host = process.env["NEXT_PUBLIC_SITE_URL"]?.startsWith("https")
    ? process.env["NEXT_PUBLIC_SITE_URL"]!
    : process.env["TIKTOK_REDIRECT_HOST"];

  return host + `tiktok_callback`;
}
