import { getBrands } from "@danklabs/cake/cms";
import { SelectPassButton } from "./SelectPassButton";
import { revalidatePath } from "next/cache";
import {
  createBrandPass,
  getMemberByIAM,
} from "@danklabs/cake/services/admin-service";
import { Passport, db } from "@danklabs/cake/db";

export async function SelectPasses({
  passport,
}: {
  passport: NonNullable<Awaited<ReturnType<typeof getMemberByIAM>>>["passport"];
}) {
  const ownedPassBrandSlugs = passport.passes.map((p) => p.brand.slug);
  const brands = await getBrands();

  async function claimPassAction(slug: string) {
    "use server";
    console.log("claim pass", slug, passport);
    await db.transaction(async (tx) => {
      await createBrandPass(tx, passport.id, slug);
    });

    revalidatePath("/collection");
    revalidatePath("/brands");
    revalidatePath(`/brands/${slug}`);
  }
  return (
    <div className="flex flex-col items-center gap-4">
      {brands.brands
        .filter((b) => ownedPassBrandSlugs.indexOf(b.slug) === -1)
        .map((b) => (
          <SelectPassButton
            name={b.name}
            claimPassAction={claimPassAction.bind(null, b.slug)}
          />
        ))}
    </div>
  );
}
