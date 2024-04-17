import { getTikTokRedirectUrl } from "./getTikTokRedirectUrl";

export function getTikTokAuthorizeLink(slug: string, csrfState: string) {
  const redirectURI = encodeURIComponent(getTikTokRedirectUrl());
  const clientKey = process.env["TIKTOK_CLIENT_KEY"];

  // TODO: Add back user.info.profile into scopes once we get the app approved
  // const scope = encodeURIComponent(
  //   "user.info.basic,user.info.profile,video.list"
  // );
  const scope = encodeURIComponent("user.info.basic,video.list");
  const state = encodeURIComponent(`${slug}::${csrfState}`);

  return `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&redirect_uri=${redirectURI}&scope=${scope}&response_type=code&state=${state}`;
}
