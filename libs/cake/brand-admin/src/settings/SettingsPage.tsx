import { SectionHeading } from "@danklabs/cake/pattern-library/core";
import { InstagramSettings } from "./instagram/InstagramSettings";
import { AdminPageHeader } from "@danklabs/pattern-library/core";
import { TikTokSettings } from "./tiktok/TikTokSettings";

export async function SettingsPage({ slug }: { slug: string }) {
  return (
    <div className="w-full flex flex-col items-center">
      <AdminPageHeader />
      <div className="container flex flex-col gap-4">
        <div className="p-3 bg-white rounded-md">
          <SectionHeading>Instagram</SectionHeading>
          <InstagramSettings slug={slug} />
        </div>
        <div className="p-3 bg-white rounded-md">
          <SectionHeading>TikTok</SectionHeading>
          <TikTokSettings slug={slug} />
        </div>
      </div>
    </div>
  );
}
