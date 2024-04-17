import { brands } from "@danklabs/cake/services/admin-service";
import { Suspense } from "react";
import { AuthorizeButton } from "./AuthorizeButton";
import { RecentTikTokPosts } from "./RecentTikTokPosts";
import { TikTokProfile } from "./TikTokProfile";
import { DisconnectButton } from "./DisconnectButton";

export function TikTokSettings({ slug }: { slug: string }) {
  return (
    <Suspense>
      <Component slug={slug} />
    </Suspense>
  );
}

async function Component({ slug }: { slug: string }) {
  const brand = await brands.getBrand(slug);

  const tiktokConfig = brand.db.settings.tiktok;

  if (!tiktokConfig || tiktokConfig.status !== "active") {
    return (
      <div>
        <div>TikTok not configured</div>
        <div>
          <AuthorizeButton slug={slug} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>TikTok successfully configured</div>
      <TikTokProfile slug={slug} />
      <RecentTikTokPosts slug={slug} />
      <DisconnectButton slug={slug} />
    </div>
  );
}
