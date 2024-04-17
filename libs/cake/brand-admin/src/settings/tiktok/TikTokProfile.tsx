import { brands } from "@danklabs/cake/services/admin-service";

export async function TikTokProfile({ slug }: { slug: string }) {
  const { configured, profile } = await brands.getTikTokProfile(slug);

  if (!configured || !profile) {
    return (
      <div>
        <div>TikTok not configured</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="container">
        <img src={profile.avatarUrl} height={"64px"} width={"64px"} />
      </div>
    </div>
  );
}
