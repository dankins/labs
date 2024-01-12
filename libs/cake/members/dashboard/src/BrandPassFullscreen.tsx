import type { PassportBrandsSelection } from "@danklabs/cake/cms";
import { PassportType } from "./PassportStack";
import { BrandCardHeroImage } from "./BrandCardHeroImage";
import { MotionDiv } from "@danklabs/pattern-library/motion";
import { auth } from "@clerk/nextjs";
import { OfferOverview } from "./OfferOverview";

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

  return (
    <div className="h-full flex flex-col items-center">
      <MotionDiv
        className="w-full h-full max-w-[600px] rounded-lg shadow-2xl bg-amber-900 relative"
        layoutId="card-container"
      >
        <div className="w-full aspect-wallet relative">
          <BrandCardHeroImage
            alt={`${brand.name} Image`}
            sanityImage={brand.passBackground}
            layoutId="card-image"
          />
          <MotionDiv
            layoutId="card-gradient"
            className="w-full h-full absolute top-0 margin-top-auto"
            style={{
              background:
                "linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%)",
            }}
          ></MotionDiv>
          <MotionDiv
            className="w-full h-full absolute top-0 flex flex-col items-center justify-center"
            layoutId="card-content"
          >
            <h1 className="text-white text-5xl">{brand.name}</h1>
          </MotionDiv>
          {/* <div className="bg-gradient-to-t from-red-500 to-transparent h-32 w-full -mt-10 absolute bottom-0"></div> */}
        </div>
        <MotionDiv
          layoutId="card-below"
          className="relative -mt-44 h-44 bg-gradient-to-t from-amber-900 from-90% to-90%"
        ></MotionDiv>
        <div className="flex flex-col m-10 text-white">
          {/* BRAND OVERVIEW */}
          <div>
            <h1>{brand.name} Cake Pass</h1>
            <p>Brand copy for the passport pass.</p>
            <div></div>
          </div>
          {/* OFFERS */}
          <div className="mt-5">
            <OfferOverview brand={brand} />
          </div>
        </div>
      </MotionDiv>
    </div>
  );
}
