import { Suspense } from "react";
import { Widget } from "./Widget";
import { MembersIcon } from "@danklabs/pattern-library/core";
import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";

export async function Members({ slug }: { slug: string }) {
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
      title="Members"
      href={`/admin/brands/${slug}/members`}
      cta={
        <>
          <MembersIcon /> View Members
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
      <div className="flex flex-row gap-3">
        <div>
          <h1 className="text-sm ">Members</h1>
          <div className="text-3xl">1.5k</div>
        </div>
        <div className="text-xs">
          <div>+12.2% - 30 days</div>
          <div>+5.2% - 60 days</div>
          <div>+1.2% - 90 days</div>
        </div>
      </div>
    </Body>
  );
}
