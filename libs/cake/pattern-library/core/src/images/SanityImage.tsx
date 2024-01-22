"use client";
import Image from "next/image";
import { SanityImageSource } from "@sanity/asset-utils";
import {
  ImageUrlBuilder,
  UseNextSanityImageBuilderOptions,
  useNextSanityImage,
} from "next-sanity-image";
import { sanityClient } from "@danklabs/integrations/sanitycms";
import { useMemo } from "react";

export type SanityImageType = {
  readonly _key: string | null;
  readonly _type: string;
  asset: {
    _type: "reference" | "sanity.imageAsset" | "sanity.fileAsset";
    metadata?: {
      lqip?: any;
    };
  };
};

type ImageBuilderFactory = (
  imageUrlBuilder: ImageUrlBuilder,
  options: UseNextSanityImageBuilderOptions
) => ImageUrlBuilder;

export type SanityImageProps = {
  image: SanityImageType;
  size?: "small";
  aspectRatio?: "portrait" | "video" | "card";
} & Omit<React.ComponentProps<typeof Image>, "src">;

export function SanityImage({
  image,
  sizes,
  aspectRatio,
  size,
  ...nextImageProps
}: SanityImageProps) {
  const imageBuilder: ImageBuilderFactory | undefined = useMemo(() => {
    if (aspectRatio) {
      console.log("build it");
      return (
        imageUrlBuilder: ImageUrlBuilder,
        options: UseNextSanityImageBuilderOptions
      ) => imageUrlBuilder.width(382).height(240).fit("crop");
    }
  }, [nextImageProps.width]);

  const options: Parameters<typeof useNextSanityImage>[2] = imageBuilder
    ? { imageBuilder }
    : undefined;
  const imageProps = useNextSanityImage(sanityClient, image, options) as any;
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
