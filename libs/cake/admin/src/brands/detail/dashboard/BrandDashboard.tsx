import { getBrandAdminData } from "@danklabs/cake/services/admin-service";
import { OffersIcon, SettingsIcon } from "@danklabs/pattern-library/core";
import { Widget } from "./Widget";
import { Members } from "./Members";
import { Settings } from "./Settings";
import { Offers } from "./Offers";
import { ActivityFeed } from "./ActivityFeed";

export function BrandDashboard({ slug }: { slug: string }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Offers slug={slug} />
      <Members slug={slug} />
      <Settings slug={slug} />
      <ActivityFeed slug={slug} />
    </div>
  );
}
