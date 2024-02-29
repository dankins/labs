import {
  SanityArtDirection,
  SanityBackgroundImage,
} from "@danklabs/cake/pattern-library/core";
import { CMSBrand } from "./types";

export function ContainerWithBackground({
  brand,
  children,
}: {
  brand: CMSBrand;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black text-white min-h-screen relative w-full h-full relative">
      <div className="absolute w-full top-0 left-0">
        <div className="relative">
          <SanityArtDirection
            alt="Brand background image"
            images={[
              /*  DESKTOP */
              {
                aspectRatio: "landscape",
                mediaQuery: "(min-width:  764px)",
                image: brand.passBackgroundDesktop,
              },
              /* MOBILE */
              {
                aspectRatio: "portrait",
                mediaQuery: "(max-width: 768px)",
                image: brand.passBackground,
              },
            ]}
            className="w-screen h-auto"
          />
          {/* GRADIENT OVERLAY */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-black/50"></div>
        </div>
      </div>

      <div className="relative top-0 left-0 flex flex-row justify-center">
        <div className="container">
          <div></div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
