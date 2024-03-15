import { getContentList } from "@danklabs/cake/cms";
import { unstable_cache } from "next/cache";

export async function getStoriesForMember(iam: string) {
  const stories = await getContentList();
  return stories.content;
}

export async function cachedGetStoriesForMember(iam: string) {
  const fn = unstable_cache(
    getStoriesForMember,
    [`get-stories-for-member-${iam}`],
    {
      revalidate: 360,
    }
  );

  return fn(iam);
}
