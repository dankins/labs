import { getInstagramRedirectUrl } from "./getInstagramRedirectUrl";

export function getInstagramAuthorizeLink(slug: string) {
  const redirectURI = getInstagramRedirectUrl();
  const clientId = process.env["INSTAGRAM_APP_ID"];
  const scope = "user_profile,user_media";
  return `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scope}&response_type=code&state=${slug}`;
}
