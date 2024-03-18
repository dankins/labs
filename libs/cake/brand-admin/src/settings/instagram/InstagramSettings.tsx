import { cachedGetBrandDetail } from "@danklabs/cake/services/admin-service";
import { Suspense } from "react";
import { AuthorizeButton } from "./AuthorizeButton";
import { RecentInstagramPosts } from "../../instagram/RecentInstagramPosts";
import { DisconnectButton } from "./DisconnectButton";

export function InstagramSettings({ slug }: { slug: string }) {
  return (
    <Suspense>
      <Component slug={slug} />
    </Suspense>
  );
}

async function Component({ slug }: { slug: string }) {
  const brand = await cachedGetBrandDetail(slug);

  const instagramConfig = brand.db.settings.instagram;

  if (!instagramConfig || instagramConfig.status !== "active") {
    return (
      <div>
        <div>Instagram not configured</div>
        <div>
          <AuthorizeButton slug={slug} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>Instagram successfully configured</div>
      <RecentInstagramPosts accessToken={instagramConfig.accessToken!} />
      <div>
        <DisconnectButton slug={slug} />
      </div>
    </div>
  );
}
