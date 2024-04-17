import { disconnect } from "./disconnect";
import { getTikTokAuthorizeLink } from "./getTikTokAuthorizeLink";
import { getTikTokRedirectUrl } from "./getTikTokRedirectUrl";
import { updateTikTokAccessToken } from "./updateTikTokAccessToken";
disconnect;

export const tiktok = {
  getTikTokAuthorizeLink,
  getTikTokRedirectUrl,
  updateTikTokAccessToken,
  disconnect,
};
