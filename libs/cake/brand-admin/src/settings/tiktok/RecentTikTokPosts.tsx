import { brands } from "@danklabs/cake/services/admin-service";
import { TikTokEmbed } from "./TikTokEmbed";

export async function RecentTikTokPosts({ slug }: { slug: string }) {
  const { configured, posts } = await brands.getTikTokPosts(slug);

  if (!configured || !posts) {
    return (
      <div>
        <div>TikTok not configured</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="container">
        <h1>Recent Posts</h1>
        <div className="grid grid-cols-4 gap-4">
          {posts.videos.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Post({
  post,
}: {
  post: NonNullable<
    Awaited<ReturnType<typeof brands.getTikTokPosts>>["posts"]
  >["videos"][0];
}) {
  return (
    <div>
      <img src={post.cover_image_url} alt={post.title} />
      {/* <div>{JSON.stringify(post, null, 2)}</div>
      <div dangerouslySetInnerHTML={{ __html: post.embed_html }} /> */}
    </div>
  );
}
