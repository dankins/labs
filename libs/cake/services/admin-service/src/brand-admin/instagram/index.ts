import { disconnectInstagram } from "./disconnectInstagram";
import { getInstagramAuthorizeLink } from "./getInstagramAuthorizeLink";
import { getInstagramRedirectUrl } from "./getInstagramRedirectUrl";
import { getLongLivedAccessToken } from "./getLongLivedAccessToken";
import { refreshInstagramToken } from "./refreshInstagramToken";
import { updateInstagramConfig } from "./updateInstagramConfig";

export const instagram = {
  disconnectInstagram,
  getInstagramAuthorizeLink,
  updateInstagramConfig,
  getInstagramRedirectUrl,
  refreshInstagramToken,
  getLongLivedAccessToken,
};
