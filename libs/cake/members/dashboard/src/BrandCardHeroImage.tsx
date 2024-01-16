"use client";
import Image from "next/image";
import {
  useNextSanityImage,
  ImageUrlBuilder,
  UseNextSanityImageBuilder,
  UseNextSanityImageBuilderOptions,
} from "next-sanity-image";
import { sanityClient } from "@danklabs/integrations/sanitycms";
import { motion } from "framer-motion";

function cardImageBuilder(
  imageUrlBuilder: ImageUrlBuilder,
  options: UseNextSanityImageBuilderOptions
) {
  return imageUrlBuilder.width(382).height(240).fit("clip");
}

function portraitImageBuilder(
  imageUrlBuilder: ImageUrlBuilder,
  options: UseNextSanityImageBuilderOptions
) {
  return imageUrlBuilder.width(382).fit("clip");
}

export function BrandCardHeroImage({
  sanityImage,
  alt,
  type,
  layoutId,
}: {
  sanityImage: any;
  alt: string;
  layoutId?: string;
  type: "card" | "portrait";
}) {
  const imageBuilder: UseNextSanityImageBuilder =
    type === "card" ? cardImageBuilder : portraitImageBuilder;
  // TODO(dankins): fix the typing here
  const imageProps = useNextSanityImage(sanityClient, sanityImage, {
    imageBuilder,
  }) as any;

  return (
    <motion.figure className="relative w-full h-full" layoutId={layoutId}>
      <Image
        alt={alt}
        src={imageProps?.src}
        loader={imageProps?.loader}
        sizes="(max-width: 800px) 100vw, 800px"
        fill
        placeholder={sanityImage ? "blur" : undefined}
        blurDataURL={sanityImage ? sanityImage.asset.metadata.lqip : undefined}
      />
    </motion.figure>
  );
}
