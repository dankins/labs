import { Suspense } from "react";
import { Widget } from "./Widget";
import {
  MembersIcon,
  OffersIcon,
  Paragraph3,
} from "@danklabs/pattern-library/core";
import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";

export async function Offers({ slug }: { slug: string }) {
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
      title="Offers"
      href={`/admin/brands/${slug}/offers`}
      cta={
        <Paragraph3>
          <OffersIcon /> Manage Offers
        </Paragraph3>
      }
    >
      {children}
    </Widget>
  );
}

function Component({ slug }: { slug: string }) {
  return <Body slug={slug}>offers stub</Body>;
}
