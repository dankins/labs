"use client";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { sanityClient } from "@danklabs/integrations/sanitycms";

export type SanityImageProps = {
  image: {
    readonly _key: string | null;
    readonly _type: string;
    asset: {
      _type: "reference";
      _ref: string;
      metadata?: {
        lqip?: any;
      };
    };
  };
} & Omit<React.ComponentProps<typeof Image>, "src">;

export function SanityImage({
  image,
  sizes,
  ...nextImageProps
}: SanityImageProps) {
  // TODO(dankins): fix the typing here
  const imageProps = useNextSanityImage(sanityClient, image) as any;
  return (
    <Image
      src={imageProps?.src}
      loader={imageProps?.loader}
      sizes={sizes || "(max-width: 800px) 100vw, 800px"}
      placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
      blurDataURL={image ? image.asset.metadata?.lqip : undefined}
      {...nextImageProps}
    />
  );
}
