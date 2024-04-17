import { unstable_cache } from "next/cache";
import { getBrand } from "../getBrand";

export async function fn(slug: string) {
  const brand = await getBrand(slug);
  if (
    !brand.db.settings.tiktok ||
    brand.db.settings.tiktok.status !== "active" ||
    !brand.db.settings.tiktok.accessToken
  ) {
    return { configured: false, posts: [] };
  }
  const accessToken = brand.db.settings.tiktok.accessToken;
  const result = await fetch(
    "https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("result", result.status, result.statusText);

  if (!result.ok) {
    throw new Error("Error fetching TikTok profile");
  }

  const profile = await result.json();

  console.log("profile", profile);

  return {
    configured: true,
    profile: {
      avatarUrl: profile.data.user.avatar_url,
    },
  };
}

export async function getTikTokProfile(slug: string) {
  return unstable_cache(fn, [`get-tiktok-profile-${slug}`], {
    revalidate: 360,
  })(slug);
}
