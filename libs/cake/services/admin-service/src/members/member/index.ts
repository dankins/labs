import { getMember } from "./getMember";
import { cachedGetById } from "./getByID";
import { getBySubscriptionId } from "./getBySubscriptionId";
import { clearCache } from "./clearCache";
import { activateMembership } from "./activateMembership";
import { DEFAULT_MAX_COLLECTION_ITEMS, create } from "./create";
import { update } from "./update";
import { updateProfile } from "./updateProfile";
import { claimPass } from "./claimPass";
import { getOrCreateByEmail } from "./getOrCreateByEmail";
import { getOrCreateByIAM } from "./getOrCreateByIAM";

import { favorites } from "./favorites";
import { invitations } from "./invitations";

export const member = {
  activateMembership,
  get: getMember,
  getById: cachedGetById,
  getBySubscriptionId,
  clearCache,
  create,
  update,
  updateProfile,
  claimPass,
  getOrCreateByEmail,
  getOrCreateByIAM,
  DEFAULT_MAX_COLLECTION_ITEMS,
  favorites,
  invitations,
};

export * from "./types";
