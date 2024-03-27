import { revalidateTag } from "next/cache";

export function clearCache(iam: string) {
  revalidateTag(`get-member-${iam}`);
}
