import { Member } from "./types";
import { DEFAULT_MAX_COLLECTION_ITEMS, create } from "./create";
import { getMember } from "./getMember";

export async function getOrCreateByIAM(
  iam: string,
  data: Parameters<typeof create>[1]
): Promise<Member> {
  try {
    const member = await getMember(iam);
    return member;
  } catch (err: any) {
    if (err.message === "member not found") {
      await create(iam, data);
      return getMember(iam);
    }
    throw err;
  }
}
