import { cachedGetMember } from "./getMember";
import { cachedGetById } from "./getByID";
import { getBySubscriptionId } from "./getBySubscriptionId";
import { clearCache } from "./clearCache";
import { updateMembershipStatus } from "./updateMembershipStatus";
import { DEFAULT_MAX_COLLECTION_ITEMS, create } from "./create";
import { update } from "./update";
import { updateProfile } from "./updateProfile";
import { claimPass } from "./claimPass";
import { getOrCreateByEmail } from "./getOrCreateByEmail";

export const member = {
  get: cachedGetMember,
  getById: cachedGetById,
  getBySubscriptionId,
  clearCache,
  updateMembershipStatus,
  create,
  update,
  updateProfile,
  claimPass,
  getOrCreateByEmail,
  DEFAULT_MAX_COLLECTION_ITEMS,
};
