import { getMember } from "./getMember";
import { getById } from "./getByID";
import { getBySubscriptionId } from "./getBySubscriptionId";
import { clearCache } from "./clearCache";
import { activateMembership } from "./activateMembership";
import { DEFAULT_MAX_COLLECTION_ITEMS, create } from "./create";
import { update } from "./update";
import { claimPass } from "./claimPass";
import { getOrCreateByEmail } from "./getOrCreateByEmail";
import { getOrCreateByIAM } from "./getOrCreateByIAM";

import { favorites } from "./favorites";
import { invitations } from "./invitations";
import { getByUsername } from "./getByUsername";
import { updateProfile } from "./updateProfile";
import { getByEmail } from "./getByEmail";
import { emailAddressExists } from "./emailAddressExists";

export const member = {
  activateMembership,
  get: getMember,
  getById,
  getBySubscriptionId,
  getByUsername,
  getByEmail,
  emailAddressExists,
  clearCache,
  create,
  update,
  updateProfile: updateProfile,
  claimPass,
  getOrCreateByEmail,
  getOrCreateByIAM,
  DEFAULT_MAX_COLLECTION_ITEMS,
  favorites,
  invitations,
};

export * from "./types";
