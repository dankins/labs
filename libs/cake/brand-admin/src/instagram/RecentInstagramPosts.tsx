import { InstagramPost, brands } from "@danklabs/cake/services/admin-service";

export async function RecentInstagramPosts({
  accessToken,
}: {
  accessToken: string;
}) {
  try {
    const posts = await brands.getInstagramPosts(accessToken);

    return (
      <div className="flex flex-col items-center justify-center">
        <div className="container">
          <h1>Recent Posts</h1>
          <div className="grid grid-cols-4 gap-4">
            {posts.data.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    );
  } catch (err) {
    return <div>error loading posts</div>;
  }
}

function Post({ post }: { post: InstagramPost }) {
  return (
    <div>
      <img src={post.media_url} style={{ width: "100%" }} />
    </div>
  );
}
