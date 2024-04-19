import {
  SanityArtDirection,
  SanityImageServer,
} from "@danklabs/cake/pattern-library/core";
import { brands } from "@danklabs/cake/services/admin-service";
import {
  CloseIcon,
  GhostButton,
  InterceptModal,
  Paragraph3,
  RightArrow,
  SecondaryButton,
} from "@danklabs/pattern-library/core";
import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";
import { Suspense } from "react";
import { CollectionItemOffers } from "./CollectionItemOffers";

export async function CollectionItemInterceptModal({ slug }: { slug: string }) {
  return (
    <InterceptModal returnHref={`/collection`}>
      <Suspense fallback={<Loading />}>
        <Component slug={slug} />
      </Suspense>
    </InterceptModal>
  );
}

export function Loading() {
  return (
    <Shell>
      <Spinner />
    </Shell>
  );
}

export async function Component({ slug }: { slug: string }) {
  const brand = await brands.getBrand(slug);

  return (
    <Shell>
      <div className="bg-black text-white relative w-full h-full relative">
        <div className="absolute w-full top-0 left-0">
          <div className="relative">
            {brand && (
              <SanityArtDirection
                priority
                alt="Brand background image"
                images={[
                  /*  DESKTOP */
                  {
                    aspectRatio: "portrait",
                    mediaQuery: "(min-width:  764px)",
                    image: brand.cms.passBackground,
                  },
                  /* MOBILE */
                  {
                    aspectRatio: "portrait",
                    mediaQuery: "(max-width: 768px)",
                    image: brand.cms.passBackground,
                  },
                ]}
                className="w-screen h-auto"
              />
            )}
            {/* GRADIENT OVERLAY */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-black/20"></div>
          </div>
        </div>

        <div className="h-full relative top-0 left-0 flex flex-row justify-center">
          <div className="p-4 w-full h-full flex flex-col justify-end container gap-6">
            {/* Close Button */}
            <div className="flex flex-row justify-end text-2xl">
              <GhostButton
                icon={<CloseIcon />}
                href={`/collection`}
                background="black/20"
                className="bg-black/20 rounded-full"
              ></GhostButton>
            </div>
            <div className="grow"></div>
            {brand.cms?.passLogo && (
              <SanityImageServer
                alt={`Logo for ${brand.cms.name}`}
                image={brand.cms?.passLogo}
                width={250}
                height={250}
                style={{
                  height: "auto",
                  width: "100%",
                  maxHeight: "80px",
                  maxWidth: "175px",
                }}
                className="invert"
              />
            )}
            <Paragraph3>{brand.cms.summary}</Paragraph3>
            <SecondaryButton icon={<RightArrow />}>
              Visit {brand.cms.name}
            </SecondaryButton>
            <CollectionItemOffers
              slug={slug}
              shopLinkTemplate={brand.cms.website || undefined}
            />
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="darkSection h-full flex flex-col items-end">{children}</div>
  );
}
