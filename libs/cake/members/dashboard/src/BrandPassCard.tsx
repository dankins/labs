import { PassportBrandsSelection } from "@danklabs/cake/cms";
import type { PassportType } from "./PassportStack";
import { BrandCardHeroImage } from "./BrandCardHeroImage";
import { motion } from "framer-motion";
import { MotionDiv } from "@danklabs/pattern-library/motion";

export function BrandPassCard({
  pass,
  brand,
}: {
  pass: PassportType["passes"][0];
  brand: PassportBrandsSelection;
}) {
  return (
    <MotionDiv
      layoutId="card-container"
      className="bg-amber-900 aspect-wallet min-w-[200px] w-full rounded-lg shadow-2xl  justify-start items-start inline-flex cursor-pointer overflow-hidden"
      // style={{ boxShadow: "0px 2px 24px 0px rgba(0, 0, 0, 0.24)" }}
    >
      <div className="w-full h-full relative max-w-[600px] aspect-wallet">
        {brand.passBackground && (
          <BrandCardHeroImage
            alt={`${brand.name} Image`}
            sanityImage={brand.passBackground}
            layoutId="card-image"
          />
        )}
        <MotionDiv
          layoutId="card-gradient"
          className="w-full h-full absolute top-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%)",
          }}
        ></MotionDiv>
        <MotionDiv className="p-3 absolute top-0" layoutId="card-content">
          <h1 className="text-white">{brand.name}</h1>
        </MotionDiv>
        <MotionDiv
          className="p-3 absolute bottom-0"
          layoutId="card-below"
        ></MotionDiv>
      </div>
    </MotionDiv>
  );
}