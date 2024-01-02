import {
  db,
  passes,
  brands,
  members,
  passports,
  offers,
} from "@danklabs/cake/db";
import { and, eq } from "drizzle-orm";

export async function getBrandPassOffers(iam: string, brandSlug: string) {
  return db
    .select()
    .from(passes)
    .innerJoin(passports, eq(passes.passportId, passports.id))
    .innerJoin(members, eq(members.id, passports.memberId))
    .innerJoin(brands, eq(brands.id, passes.brandId))
    .leftJoin(offers, eq(offers.passId, passes.id))
    .where(and(eq(brands.slug, brandSlug), eq(members.iam, iam)));

  //   return db.query.members.findFirst({
  //     where: eq(members.iam, iam),
  //     with: {
  //       passport: {
  //         with: {
  //           passes: {
  //             with: {
  //               brand: {
  //                 // where: (brands, { eq }) => eq(brands.slug, brandSlug),
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
}
