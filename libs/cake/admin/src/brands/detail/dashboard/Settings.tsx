import { Suspense } from "react";
import { Widget } from "./Widget";
import {
  Heading1,
  Paragraph3,
  SettingsIcon,
} from "@danklabs/pattern-library/core";
import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";
import { cachedGetBrandDetail } from "@danklabs/cake/services/admin-service";

export async function Settings({ slug }: { slug: string }) {
  return (
    <Suspense
      fallback={
        <Body slug={slug}>
          <Spinner />
        </Body>
      }
    >
      <Component slug={slug} />
    </Suspense>
  );
}

function Body({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <Widget
      title="Settings"
      href={`/admin/brands/${slug}/settings`}
      cta={
        <Paragraph3>
          <SettingsIcon /> Configure Settings
        </Paragraph3>
      }
    >
      {children}
    </Widget>
  );
}

async function Component({ slug }: { slug: string }) {
  const brand = await cachedGetBrandDetail(slug);
  let color = "text-gray-500";
  switch (brand.db.status) {
    case "active":
      color = "text-green-500";
      break;
    case "deactivated":
      color = "text-red-500";
      break;
    case "draft":
      "text-gray-500";
      break;
    case "paused":
      "text-yellow-500";
      break;
  }

  return (
    <Body slug={slug}>
      <h3 className="text-xs text-gray-500">Brand Status</h3>
      <Heading1 className={`uppercase text-4xl ${color}`}>
        {brand.db.status}
      </Heading1>
    </Body>
  );
}
