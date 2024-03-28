import { db } from "@danklabs/cake/db";
import { sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";

async function getAnalyticsDailyMemberCount(
  brandSlug: string,
  days: number = 90
): Promise<
  { the_date: string; new_members: number; cumulative_members: number }[]
> {
  const interval = `${days} days`;

  const result = await db.execute(sql`
SELECT 
the_date,
new_members,
SUM(new_members) OVER (ORDER BY the_date) AS cumulative_members
FROM
(
    SELECT generate_series::date as the_date
    FROM generate_series(
        CURRENT_DATE - INTERVAL '90 days',
        CURRENT_DATE,
        '1 day'
    )
) dates
LEFT JOIN (
    select 
    date(p.created_at) as join_date,
    count(*) as new_members
    FROM
    passes p
    inner join brands b ON p.brand_id = b.id
    WHERE
    b.slug = ${brandSlug}
    GROUP BY join_date
) data ON data.join_date = dates.the_date
order by the_date
`);
  console.log("getAnalyticsDailyMemberCount result", {
    result,
    // @ts-ignore not safe, I know
    resultRows: result?.rows,
  });

  if (Array.isArray(result)) {
    // @ts-ignore not safe, I know
    return result;
  }
  // @ts-ignore not safe, I know
  return result?.rows || result;
}

export async function cachedGetAnalyticsDailyMemberCount(
  brandSlug: string,
  days: number = 90
) {
  const fn = unstable_cache(
    getAnalyticsDailyMemberCount,
    [`get-analytics-daily-member-count-${brandSlug}-${days}`],
    {
      revalidate: 60 * 60,
    }
  );

  return fn(brandSlug, days);
}
