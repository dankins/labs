import {
  SanityArtDirection,
  SanityImageServer,
} from "@danklabs/cake/pattern-library/core";
import { brands } from "@danklabs/cake/services/admin-service";
import {
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
          <div className="p-4 w-full h-full flex flex-col justify-end container">
            <div></div>
            <div>
              <SanityImageServer
                alt="Brand logo"
                image={brand.cms.passLogo!}
                className="w-20 h-auto invert"
                width={200}
                height={100}
              />
              <div className="my-10">
                <Paragraph3>{brand.cms.summary}</Paragraph3>
              </div>
              <SecondaryButton icon={<RightArrow />}>
                Visit {brand.cms.name}
              </SecondaryButton>
            </div>
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
