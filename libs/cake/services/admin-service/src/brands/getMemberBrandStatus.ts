import { db } from "@danklabs/cake/db";
import { sql } from "drizzle-orm";
import postgres from "postgres";

export async function getMemberBrandStatus(userIAM: string, brandSlug: string) {
  const result = await db.execute(sql`
SELECT 
members.id as "memberId",
CASE WHEN EXISTS (
    select 
        case when brands.id is null then false else true end as is_member
    FROM
    members m
    inner join passports p ON p.member_id = m.id
    inner join passes ON p.id = passes.passport_id
    inner join brands ON passes.brand_id = brands.id
    WHERE 
    m.iam = ${userIAM}
    and brands.slug = ${brandSlug}
) THEN true    
ELSE false  
END AS "isInCollection",
CASE WHEN EXISTS (
    select 
        case when brands.id is null then false else true end as is_favorite
    FROM
    members m
    inner join favorites f ON f.member_id = m.id
    inner join brands ON f.brand_id = brands.id
    WHERE 
    m.iam = ${userIAM}
    and brands.slug = ${brandSlug}
) THEN true    
ELSE false  
END AS "isFavorite"
FROM
members
WHERE 
members.iam = ${userIAM}
;  
`);

  // @ts-ignore not safe, I know
  return result[0];
}

// getMemberByIAM(userId, { passport: true }).then((member) => ({
//     passes: member?.passport.passes || [],
//     isMember: member?.passport.passes
//       .map((p) => p.brand.slug)
//       .includes(slug),
//     passportId: member?.passport.id,
//     passCount: member?.passport.passes.length || 1000,
//     // TOOD(dankins): model this better
//     unclaimedPassCount: 10 - (member?.passport.passes.length || 10),
//   })),

// const passportValue = passes.reduce((acc, cur) => {
//     return (
//       acc +
//       cur.offers.reduce(
//         (acc, cur) => acc + parseFloat(cur.template.offerValue),
//         0
//       )
//     );
//   }, 0);
