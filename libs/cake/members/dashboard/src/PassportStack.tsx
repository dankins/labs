import { getPassportBrands } from "@danklabs/cake/cms";
import { getMemberByIAM } from "@danklabs/cake/services/admin-service";
import { ExpandableCard } from "./ExpandableCard";
import { BrandPassCard } from "./BrandPassCard";
import { BrandPassFullscreen } from "./BrandPassFullscreen";

export type PassportType = NonNullable<
  Awaited<ReturnType<typeof getMemberByIAM>>
>["passport"];

export async function PassportStack({ passport }: { passport: PassportType }) {
  if (passport.passes.length === 0) {
    return <div>No passes!</div>;
  }
  const brandSlugs = passport.passes.map((p) => p.brand.slug);
  const brands = await getPassportBrands(brandSlugs);
  return (
    <div className="grid">
      {passport.passes.map((p, idx) => (
        <div
          className="col-start-1 row-start-1"
          style={{ marginTop: `${idx * 3}rem` }}
        >
          <ExpandableCard
            groupId={p.id}
            card={<BrandPassCard pass={p} brand={brands[p.brand.slug]} />}
            fullscreen={
              <BrandPassFullscreen pass={p} brand={brands[p.brand.slug]} />
            }
          />
        </div>
      ))}
    </div>
  );
}
