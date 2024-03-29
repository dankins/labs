import { assignInvite } from "./assignInvite";
import { cancelInvite } from "./cancelInvite";
import { emailInvite } from "./emailInvite";
import { getInvitation } from "./getInvitation";
import { getByCode } from "./getByCode";
import { getMemberInvitations } from "./getMemberInvitations";
import { create } from "./create";
import { incrementRedemptions } from "./incrementRedemptions";
import { getCampaignInvites } from "./getCampaignInvites";
import { clearCampaignInvitesListCache } from "./clearCampaignInvitesListCache";
import { createCampaignInvitation } from "./createCampaignInvitation";

export const invitations = {
  assignInvite,
  cancelInvite,
  emailInvite,
  getMemberInvitations,
  getInvitation,
  create,
  incrementRedemptions,
  getByCode,
  getCampaignInvites,
  clearCampaignInvitesListCache,
  createCampaignInvitation,
};
