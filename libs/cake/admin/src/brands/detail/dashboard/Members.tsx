import { Suspense } from "react";
import { AxisOptions, Chart } from "react-charts";

import {
  Heading1,
  MembersIcon,
  Paragraph3,
  Spinner,
} from "@danklabs/pattern-library/core";
import { cachedGetAnalyticsDailyMemberCount } from "@danklabs/cake/services/admin-service";

import { Widget } from "./Widget";

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
        <Paragraph3>
          <MembersIcon /> View Members
        </Paragraph3>
      }
    >
      {children}
    </Widget>
  );
}

async function Component({ slug }: { slug: string }) {
  const data = await cachedGetAnalyticsDailyMemberCount(slug, 90);
  const lastData = data[data.length - 1];

  return (
    <Body slug={slug}>
      <div className="flex flex-row gap-3">
        <div className="flex flex-col items-center">
          <h1 className="text-sm ">Members</h1>
          <Heading1 className="text-3xl">
            {lastData?.cumulative_members}
          </Heading1>
        </div>
        <div className="text-xs">
          <Change daysAgo={30} data={data} />
          <Change daysAgo={60} data={data} />
          <Change daysAgo={90} data={data} />
        </div>
      </div>
    </Body>
  );
}

export function Change({
  daysAgo,
  data,
}: {
  daysAgo: number;
  data: {
    the_date: string;
    new_members: number;
    cumulative_members: number;
  }[];
}) {
  const current = data[data.length - 1];
  const past = data[data.length - daysAgo];
  const change = current.cumulative_members - (past.cumulative_members || 0);
  const percentChange =
    past.cumulative_members > 0 ? change / past.cumulative_members : undefined;

  return (
    <div>
      +{change} members {percentChange && <> ({percentChange}%)</>} - {daysAgo}{" "}
      days
    </div>
  );
}
