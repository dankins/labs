import { SanityArtDirection } from "@danklabs/cake/pattern-library/core";
import { CMSBrand } from "./types";

type ContainerWithBackgroundProps =
  | {
      loading?: false;
      brand?: CMSBrand;
      children: React.ReactNode;
    }
  | { children: React.ReactNode; loading?: true; brand?: undefined };

export function ContainerWithBackground({
  loading,
  brand,
  children,
}: ContainerWithBackgroundProps) {
  return (
    <div className="bg-black text-white min-h-screen relative w-full h-full relative">
      <div className="absolute w-full top-0 left-0">
        <div className="relative">
          {brand && (
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
          )}
          {/* GRADIENT OVERLAY */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-black/50"></div>
        </div>
      </div>

      <div className="relative top-0 left-0 flex flex-row justify-center">
        <div className="p-4 container">
          <div></div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
