"use client";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { sanityClient } from "@danklabs/integrations/sanitycms";
import { motion } from "framer-motion";

export function BrandCardHeroImage({
  sanityImage,
  alt,
  layoutId,
}: {
  sanityImage: any;
  alt: string;
  layoutId?: string;
}) {
  // TODO(dankins): fix the typing here
  const imageProps = useNextSanityImage(sanityClient, sanityImage) as any;

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
