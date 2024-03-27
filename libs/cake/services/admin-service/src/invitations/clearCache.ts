import { revalidateTag } from "next/cache";

export function clearMemberInvitationsCache(iam: string) {
  revalidateTag(`get-member-invitations-${iam}`);
}
