import { Suspense } from "react";
import { Widget } from "./Widget";
import { MembersIcon } from "@danklabs/pattern-library/core";
import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";

export async function ActivityFeed({ slug }: { slug: string }) {
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
      size="full"
      title="Recent Activity"
      href={`/admin/brands/${slug}/offers`}
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

async function Component({ slug }: { slug: string }) {
  return <Body slug={slug}>activity feed stub</Body>;
}
