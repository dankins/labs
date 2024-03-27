import { cachedGetMember } from "./getMember";
import { cachedGetById } from "./getByID";
import { getBySubscriptionId } from "./getBySubscriptionId";
import { clearCache } from "./clearCache";
import { updateMembershipStatus } from "./updateMembershipStatus";
import { create } from "./create";
import { updateProfile } from "./updateProfile";
import { claimPass } from "./claimPass";

export const member = {
  get: cachedGetMember,
  getById: cachedGetById,
  getBySubscriptionId,
  clearCache,
  updateMembershipStatus,
  create,
  updateProfile,
  claimPass,
};
