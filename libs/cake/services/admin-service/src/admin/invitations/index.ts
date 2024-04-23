import { getCampaigns, getCampaigns_clearCache } from "./getCampaigns";
import { clearCampaignInvitesListCache } from "./clearCampaignInvitesListCache";
import { createCampaign } from "./createCampaign";
import { getCampaign } from "./getCampaign";
import { createCampaignInvitations } from "./createCampaignInvitations";
import {
  getTrancheInvitations,
  clearTrancheCache,
} from "./getTrancheInvitations";

export const invitations = {
  getCampaign,
  getCampaigns,
  getCampaigns_clearCache,
  getTrancheInvitations,
  clearTrancheCache,
  clearCampaignInvitesListCache,
  createCampaign,
  createCampaignInvitations,
};
