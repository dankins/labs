const access_token =
  "IGQWRNaHVqa1M1amhWd2JmRnlud1FIT0k4am51d1FjQk8wRTNpa2xKSTBPSkV3aV9saG9Eb09JTFNndVlMRFR0cUJNR0tEZAnprUXNpRjRFTGJ5Qlhhc3N2QXdVNHdiekxRZAm1fVEZA5UW8xb1dIWjZAILTNSWDhiYm5ONzYxQ2lVQnV3dwZDZD";
const user_id = 7303719326359955;

export async function InstagramProfile() {
  const fields = "id,username";
  const url = `https://graph.instagram.com/me?fields=${fields}&access_token=${access_token}`;
  const response = await fetch(url);

  if (!response.ok) {
    const body = await response.json();
    console.log("Error fetching Instagram profile:", body);
    return <div>Error loading Instagram posts</div>;
  }
  const data = await response.json();

  // The 'data' object contains the posts. You can process it further as needed.
  console.log(data);
  return (
    <div>
      <div>
        <h1>Profile</h1>
        <div>{data.username}</div>
      </div>
    </div>
  );
}
