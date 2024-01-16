import type { PassportBrandsSelection } from "@danklabs/cake/cms";
import { PassportType } from "./PassportStack";
import { BrandCardHeroImage } from "./BrandCardHeroImage";
import { MotionDiv } from "@danklabs/pattern-library/motion";
import { auth } from "@clerk/nextjs";
import { OfferOverview } from "./OfferOverview";
import { SanityImage } from "./SanityImage";

export async function BrandPassFullscreen({
  pass,
  brand,
}: {
  pass: PassportType["passes"][0];
  brand: PassportBrandsSelection;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("not authenticated");
  }

  const topColor = `rgba(0,0,0,0.5)`;
  const middleColor = brand.pass_color
    ? `rgba(${brand.pass_color?.rgb.r},${brand.pass_color.rgb.g},${brand.pass_color.rgb.b}, 0.50)`
    : `rgba(0,0,0,0.5)`;
  const bottomColor = brand.pass_color
    ? `rgba(${brand.pass_color?.rgb.r},${brand.pass_color.rgb.g},${brand.pass_color.rgb.b}, 1)`
    : `rgba(0,0,0,1)`;
  const gradient = `linear-gradient(0deg, ${bottomColor} 0%, ${middleColor} 15%, ${topColor} 100%)`;

  return (
    <div className="h-full flex flex-col items-end">
      <MotionDiv
        className="w-full h-full max-w-[465px] rounded-lg shadow-2xl relative"
        style={{
          backgroundColor: brand.pass_color ? brand.pass_color.hex : "#000",
        }}
        layoutId="card-container"
      >
        <div className="w-full aspect-[2/3] relative">
          <BrandCardHeroImage
            alt={`${brand.name} Image`}
            sanityImage={brand.passBackground}
            type="portrait"
            layoutId="card-image"
          />
          <MotionDiv
            layoutId="card-gradient"
            className="w-full h-full absolute top-0 margin-top-auto"
            style={{
              // background:
              //   "linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%)",
              background: gradient,
            }}
          ></MotionDiv>
          <MotionDiv
            className="w-full h-full absolute top-0 flex flex-col items-center justify-center"
            layoutId="card-content"
          >
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
          </MotionDiv>
        </div>

        <div className="flex flex-col m-10 text-white">
          {/* BRAND OVERVIEW */}
          <div>
            <h1>{brand.name} Cake Pass</h1>
            <p>Brand copy for the passport pass.</p>
            <div></div>
          </div>
          {/* OFFERS */}
          {JSON.stringify(brand.pass_color)}
          <div className="mt-5">
            <OfferOverview brand={brand} />
          </div>
        </div>
      </MotionDiv>
    </div>
  );
}
