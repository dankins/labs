import { z } from "zod";
import { getBrand } from "../getBrand";

const postSchema = z.object({
  data: z.object({
    has_more: z.boolean(),
    cursor: z.number(),
    videos: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        video_description: z.string(),
        cover_image_url: z.string(),
        duration: z.number(),
        embed_link: z.string(),
        embed_html: z.string(),
        share_url: z.string(),
      })
    ),
  }),
  error: z.object({
    code: z.string(),
    message: z.string(),
    log_id: z.string(),
  }),
});

export type TikTokPost = z.infer<typeof postSchema>["data"];

export async function getTikTokPosts(slug: string) {
  const brand = await getBrand(slug);
  if (
    !brand.db.settings.tiktok ||
    brand.db.settings.tiktok.status !== "active" ||
    !brand.db.settings.tiktok.accessToken
  ) {
    return { configured: false };
  }
  const accessToken = brand.db.settings.tiktok.accessToken;
  const result = await fetch(
    "https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,duration,cover_image_url,share_url,embed_link,embed_html",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("result", result.status, result.statusText);

  if (!result.ok) {
    throw new Error("Error fetching TikTok posts");
  }

  const data = await result.json();
  if (data.error.code !== "ok") {
    console.error("error fetching posts", data);
    throw new Error("error fetching posts");
  }
  const parsed = postSchema.parse(data);

  return {
    configured: true,
    posts: parsed.data,
  };
}
