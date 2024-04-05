import { brands } from "@danklabs/cake/services/admin-service";
import { Suspense } from "react";
import { AuthorizeButton } from "./AuthorizeButton";

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

  if (!tiktokConfig) {
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
      <div>Instagram successfully configured</div>
      {/* <Recent accessToken={tiktokConfig.accessToken!} /> */}
    </div>
  );
}
