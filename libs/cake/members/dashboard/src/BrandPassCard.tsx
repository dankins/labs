import { PassportBrandsSelection } from "@danklabs/cake/cms";
import type { PassportType } from "./PassportStack";
import { BrandCardHeroImage } from "./BrandCardHeroImage";
import { motion } from "framer-motion";
import { MotionDiv } from "@danklabs/pattern-library/motion";
import { SanityImage } from "./SanityImage";

export function BrandPassCard({
  pass,
  brand,
}: {
  pass: PassportType["passes"][0];
  brand: PassportBrandsSelection;
}) {
  const style = {
    backgroundColor: brand.pass_color ? brand.pass_color.hex : "#000",
  };
  const cardGradient = brand.pass_color
    ? `linear-gradient(0deg, rgba(${brand.pass_color?.rgb.r},${brand.pass_color?.rgb.g},${brand.pass_color?.rgb.b}, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%)`
    : `rgba(0,0,0,0.5)`;
  return (
    <MotionDiv
      layoutId="card-container"
      className="bg-amber-900 aspect-wallet min-w-[200px] w-full rounded-lg shadow-2xl  justify-start items-start inline-flex cursor-pointer overflow-hidden"
      // style={{ boxShadow: "0px 2px 24px 0px rgba(0, 0, 0, 0.24)" }}
      style={style}
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
            background: cardGradient,
          }}
        ></MotionDiv>
        <MotionDiv
          className="p-3 absolute top-0 left-0 w-full"
          layoutId="card-content"
        >
          <div>
            {brand.passLogo ? (
              <SanityImage
                alt={`${brand.name} Logo`}
                image={brand.passLogo}
                height={0}
                width={0}
                style={{ height: "1.25rem", width: "auto" }}
              />
            ) : (
              <h1 className="text-white">{brand.name}</h1>
            )}
          </div>
        </MotionDiv>
        <MotionDiv
          className="p-3 absolute bottom-0"
          layoutId="card-below"
        ></MotionDiv>
      </div>
    </MotionDiv>
  );
}
