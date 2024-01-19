import { getBrands } from "@danklabs/cake/cms";
import { Suspense } from "react";
import { SanityImage } from "../../dashboard/src/SanityImage";
import { LogoSpace } from "@danklabs/cake/pattern-library/core";
import Link from "next/link";
import { getMemberByIAM } from "@danklabs/cake/services/admin-service";
import { auth } from "@clerk/nextjs";

type Brand = Awaited<ReturnType<typeof getBrands>>["brands"][0];
type Pass = NonNullable<
  Awaited<ReturnType<typeof getMemberByIAM>>
>["passport"]["passes"][0];

type PassMap = { [slug: string]: Pass };

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
  const { userId } = auth();
  if (!userId) {
    throw new Error("userid not available");
  }

  const [brands, passes] = await Promise.all([
    getBrands(),
    getMemberByIAM(userId, { passport: true }).then((member) =>
      member?.passport.passes.reduce((acc, cur) => {
        acc[cur.brand.slug] = cur;
        return acc;
      }, {} as PassMap)
    ),
  ]);

  if (!passes) {
    return <div>error loading brands: invalid member id</div>;
  }

  return (
    <div>
      <BrandGrid brands={brands.brands} passes={passes} />
    </div>
  );
}

function BrandGrid({ brands, passes }: { brands: Brand[]; passes: PassMap }) {
  return (
    <div className="grid grid-cols-4">
      {brands.map((b) => (
        <GridItem brand={b} pass={passes[b.slug]} />
      ))}
    </div>
  );
}

function GridItem({ brand, pass }: { brand: Brand; pass?: Pass }) {
  return (
    <Link href={`/brands/${brand.slug}`}>
      <div className="w-full aspect-[2/3] relative group">
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
        <div className="w-full h-full absolute top-0 margin-top-auto bg-black/50 group-hover:bg-transparent"></div>
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
        <div className="absolute top-0 w-full h-full p-4 flex flex-col items-end justify-end">
          {pass && (
            <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-blue-700 bg-blue-100 border border-blue-300">
              <div className="text-xs font-normal leading-none max-w-full flex-initial">
                Member
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
