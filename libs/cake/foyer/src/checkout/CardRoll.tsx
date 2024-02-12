import { getBrands } from "@danklabs/cake/cms";
import { LogoSpace, SanityImage } from "@danklabs/cake/pattern-library/core";
import { Suspense } from "react";
import { Brand } from "../brand-selection/types";
import "./CardRoll.css";

export async function CardRoll({ brandSlugs }: { brandSlugs: string[] }) {
  return (
    <Suspense fallback={<div className="w-[264px] aspect-[2/3]" />}>
      <Component brandSlugs={brandSlugs} />
    </Suspense>
  );
}

async function Component({ brandSlugs }: { brandSlugs: string[] }) {
  const allBrands = await getBrands();
  const selectedBrands = allBrands.brands.filter((b) =>
    brandSlugs.includes(b.slug)
  );
  return (
    <div className="mb-5 w-full CardRoll">
      <div>
        {selectedBrands.map((b) => (
          <BrandCard key={b.slug} brand={b} />
        ))}
      </div>
      <div>
        {selectedBrands.map((b) => (
          <BrandCard key={b.slug} brand={b} />
        ))}
      </div>
      <div>
        {selectedBrands.map((b) => (
          <BrandCard key={b.slug} brand={b} />
        ))}
      </div>
    </div>
  );
}

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div className="w-[240px] aspect-[2/3] rounded-xl overflow-hidden">
      <div className="w-full h-full relative ">
        <SanityImage
          alt={`${brand.name} Card Image`}
          image={brand.passBackground!}
          aspectRatio={"portrait"}
          fill
          className="absolute top-0 left-0"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60">
          <LogoSpace>
            {brand.passLogo ? (
              <SanityImage
                alt={`${brand.name} Logo`}
                image={brand.passLogo}
                height={0}
                width={0}
                style={{ height: "2.5rem", width: "auto" }}
              />
            ) : (
              <h1 className="text-white text-5xl">{brand.name}</h1>
            )}
          </LogoSpace>
        </div>
      </div>
    </div>
  );
}
