import { revalidateTag } from "next/cache";
import { getCampaignsTag } from "./getCampaigns";

export async function clearCampaignInvitesListCache() {
  revalidateTag(getCampaignsTag());
}
