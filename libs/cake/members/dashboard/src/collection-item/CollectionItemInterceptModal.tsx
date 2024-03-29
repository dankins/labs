import {
  SanityArtDirection,
  SanityImageServer,
} from "@danklabs/cake/pattern-library/core";
import { cachedGetBrandDetail } from "@danklabs/cake/services/admin-service";
import {
  InterceptModal,
  LeftArrow,
  Paragraph3,
  PrimaryButton,
  RightArrow,
  SecondaryButton,
} from "@danklabs/pattern-library/core";
import { ContainerWithBackground } from "libs/cake/members/brands/src/brand/components/ContainerWithBackground";
import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";
import { Suspense } from "react";

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
  const [collectionItem, brand] = await Promise.all([
    Promise.resolve(-1),
    cachedGetBrandDetail(slug),
  ]);

  return (
    <Shell>
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
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-black/50"></div>
          </div>
        </div>

        <div className="relative top-0 left-0 flex flex-row justify-center">
          <div className="mt-[400px] p-4 container">
            <div></div>
            <div>
              <SanityImageServer
                alt="Brand logo"
                image={brand.cms.passLogo!}
                className="w-20 h-auto"
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
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return <div className="darkSection h-full">{children}</div>;
}
