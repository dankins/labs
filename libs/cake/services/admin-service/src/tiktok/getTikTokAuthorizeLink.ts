import { getTikTokRedirectUrl } from "./getTikTokRedirectUrl";

export function getTikTokAuthorizeLink(slug: string, csrfState: string) {
  const redirectURI = encodeURIComponent(getTikTokRedirectUrl());
  const clientKey = process.env["TIKTOK_CLIENT_KEY"];
  const scope = "user.info.basic,video.list";

  return `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&redirect_uri=${redirectURI}&scope=${scope}&response_type=code&state=${slug},${csrfState}`;
}
