import { clerkClient } from "@clerk/nextjs/server";
import { brands, db } from "@danklabs/cake/db";
import { sql } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";

export async function getBrandAdminOptions(iam: string): Promise<string[]> {
  console.log("calling getBrandAdminOptions", iam);
  const user = await clerkClient.users.getUser(iam);
  const emails = user.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId
  );
  if (!emails) {
    throw new Error("could not get email of user");
  }
  const email = emails!.emailAddress;

  console.log("about to query", email);
  const result = await db.select({ slug: brands.slug }).from(brands).where(sql`
    EXISTS (
      SELECT 1
      FROM jsonb_array_elements(case jsonb_typeof(admins) 
      when 'array' then admins 
      else '[]' end
  ) AS elem
      WHERE elem->>'email' = ${email}
  )
    `);

  return result.map((row) => row.slug);
}

export const cachedGetBrandAdminOptions = unstable_cache(
  getBrandAdminOptions,
  ["user-brand-admin-brands"],
  {
    revalidate: 60,
  }
);

export function invalidateGetBrandAdminOptions(iam: string) {
  // revalidateTag()
}
