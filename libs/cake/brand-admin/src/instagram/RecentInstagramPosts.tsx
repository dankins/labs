const access_token =
  "IGQWRNaHVqa1M1amhWd2JmRnlud1FIT0k4am51d1FjQk8wRTNpa2xKSTBPSkV3aV9saG9Eb09JTFNndVlMRFR0cUJNR0tEZAnprUXNpRjRFTGJ5Qlhhc3N2QXdVNHdiekxRZAm1fVEZA5UW8xb1dIWjZAILTNSWDhiYm5ONzYxQ2lVQnV3dwZDZD";
const user_id = 7303719326359955;

type InstgramPost = {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  permalink: string;
};

type InstagramResponse<T> = {
  data: T;
  paging: {
    cursors: {
      before: string;
      after: string;
    };
    next: string;
  };
};

export async function RecentInstagramPosts() {
  const fields = "id,caption,media_type,media_url,permalink";
  const limit = 6; // Number of posts to fetch
  const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${access_token}&limit=${limit}`;
  const response = await fetch(url);

  if (!response.ok) {
    const body = await response.json();
    console.log("Error fetching Instagram posts:", body);
    return <div>Error loading Instagram posts</div>;
  }
  const posts: InstagramResponse<InstgramPost[]> = await response.json();

  // The 'data' object contains the posts. You can process it further as needed.
  console.log(posts);
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
}

function Post({ post }: { post: InstgramPost }) {
  return (
    <div>
      <img src={post.media_url} style={{ width: "100%" }} />
    </div>
  );
}
