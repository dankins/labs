import { addConnection } from "./addConnection";
import { getConnections } from "./getConnections";
import { getProfile, getProfile_clearCache } from "./getProfile";
import { recommendConnections } from "./recommendConnections";
import { removeConnection } from "./removeConnection";
import { updateUsername } from "./updateUsername";

export const community = {
  getProfile,
  getProfile_clearCache,
  addConnection,
  removeConnection,
  getConnections,
  updateUsername,
  recommendConnections,
};
