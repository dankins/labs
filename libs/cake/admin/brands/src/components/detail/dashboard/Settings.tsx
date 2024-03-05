import { Suspense } from "react";
import { Widget } from "./Widget";
import { SettingsIcon } from "@danklabs/pattern-library/core";
import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";

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
        <>
          <SettingsIcon /> Configure Settings
        </>
      }
    >
      {children}
    </Widget>
  );
}

function Component({ slug }: { slug: string }) {
  return (
    <Body slug={slug}>
      <h3 className="text-xs text-gray-500">Brand Status</h3>
      <div className="uppercase text-4xl text-green-500">Active</div>
    </Body>
  );
}
