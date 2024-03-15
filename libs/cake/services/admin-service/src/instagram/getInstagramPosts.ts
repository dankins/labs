import { unstable_cache } from "next/cache";
import { refreshInstagramToken } from "./refreshInstagramToken";

export type InstagramPost = {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  permalink: string;
};

export type InstagramResponse<T> = {
  data: T;
  paging: {
    cursors: {
      before: string;
      after: string;
    };
    next: string;
  };
};

export async function getInstagramPosts(
  accessToken: string
): Promise<InstagramResponse<InstagramPost[]>> {
  console.log("calling getInstagramPosts");
  const fields = "id,caption,media_type,media_url,permalink";
  const limit = 6; // Number of posts to fetch
  const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}&limit=${limit}`;
  const response = await fetch(url);

  if (!response.ok) {
    let body: any;
    try {
      const bodyText = await response.text();
      if (bodyText === "Sorry, this content isn't available right now") {
        throw new Error("Error loading Instagram posts");
      }
      console.log("bodyText", bodyText);
      body = JSON.parse(bodyText);
    } catch (err) {
      console.log("error parsing json", err);
    }

    if (body.error.code === 190) {
      const newToken = await refreshInstagramToken(accessToken);
      return getInstagramPosts(newToken);
    }
    console.log("Error fetching Instagram posts:", body);
    throw new Error("Error loading Instagram posts");
  }
  return response.json();
}

export async function cachedGetInstagramPosts(accessToken: string) {
  const fn = unstable_cache(
    getInstagramPosts,
    [`get-instagram-posts-${accessToken}`],
    {
      revalidate: 360,
    }
  );

  return fn(accessToken);
}
