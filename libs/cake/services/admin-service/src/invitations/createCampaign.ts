import slugify from "slugify";
import { InvitationCampaign, db, invitationCampaigns } from "@danklabs/cake/db";
import { clearCampaignInvitesListCache } from "./clearCampaignInvitesListCache";
import { members } from "../members";

export async function createCampaign(
  input: Omit<
    typeof invitationCampaigns.$inferInsert,
    "id" | "slug" | "memberId" | "updatedAt" | "createdAt"
  > & { memberEmail?: string }
): Promise<InvitationCampaign> {
  const { memberEmail, ...partialRecord } = input;

  const record: typeof invitationCampaigns.$inferInsert = {
    ...partialRecord,
    slug: slugify(partialRecord.name, { lower: true }),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  if (memberEmail) {
    const member = await members.member.getOrCreateByEmail(memberEmail);
    record.memberId = member.id;
  }

  const result = await db
    .insert(invitationCampaigns)
    .values(record)
    .returning()
    .execute();

  if (result.length === 0) {
    throw new Error("unable to create invitation");
  }

  clearCampaignInvitesListCache();

  return result[0];
}
