"use client";
import Image from "next/image";
import {
  ImageUrlBuilder,
  UseNextSanityImageBuilder,
  UseNextSanityImageBuilderOptions,
  useNextSanityImage,
} from "next-sanity-image";
import { sanityClient } from "@danklabs/integrations/sanitycms";

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

export function portraitCropBuilder(width: number) {
  return (
    imageUrlBuilder: ImageUrlBuilder,
    options: UseNextSanityImageBuilderOptions
  ) =>
    imageUrlBuilder
      .width(width)
      .height((width * 3) / 2)
      .fit("crop");
}

export type SanityImageProps = {
  image: SanityImageType;
  imageBuilder?: UseNextSanityImageBuilder;
} & Omit<React.ComponentProps<typeof Image>, "src">;

export function SanityImage({
  image,
  sizes,
  imageBuilder,
  ...nextImageProps
}: SanityImageProps) {
  const options: Parameters<typeof useNextSanityImage>[2] = { imageBuilder };
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
