import { getBrands } from "@danklabs/cake/cms";
import { Suspense } from "react";
import { SanityImage } from "../../dashboard/src/SanityImage";
import { LogoSpace } from "@danklabs/cake/pattern-library/core";
import Link from "next/link";

type Brand = Awaited<ReturnType<typeof getBrands>>["brands"][0];

export async function GridList() {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
}

export async function Loading() {
  return <div>loading</div>;
}

export async function Component() {
  const brands = await getBrands();
  return (
    <div>
      <BrandGrid brands={brands.brands} />
    </div>
  );
}

function BrandGrid({ brands }: { brands: Brand[] }) {
  return (
    <div className="grid grid-cols-4">
      {brands.map((b) => (
        <GridItem brand={b} />
      ))}
    </div>
  );
}

function GridItem({ brand }: { brand: Brand }) {
  return (
    <Link href={`/brands/${brand.slug}`}>
      <div className="w-full aspect-[2/3] relative">
        <figure className="absolute top-0 w-full h-full">
          {brand.passBackground && (
            <SanityImage
              alt={`${brand.name} Logo`}
              image={brand.passBackground}
              height={0}
              width={0}
              style={{ height: "100%", width: "100%" }}
            />
          )}
        </figure>
        <div className="absolute top-0 w-full h-full p-4">
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
    </Link>
  );
}
