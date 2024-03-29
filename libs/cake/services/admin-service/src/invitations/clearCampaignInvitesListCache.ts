import { revalidateTag } from "next/cache";
import { getCampaignInvitesTag } from "./getCampaignInvites";

export async function clearCampaignInvitesListCache() {
  revalidateTag(getCampaignInvitesTag());
}
