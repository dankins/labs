import { sanityClient } from "@danklabs/integrations/sanitycms";

import Image from "next/image";
import { AspectRatioChoices, SanityImageType, buildImageProps } from "./utils";
import next from "next";

type SanityImageProps = {
  image: SanityImageType;
  aspectRatio?: AspectRatioChoices;
} & Omit<React.ComponentProps<typeof Image>, "src">;

export function SanityImageServer({
  image,
  sizes,
  aspectRatio,
  ...nextImageProps
}: SanityImageProps) {
  const imageProps = buildImageProps(aspectRatio, image, nextImageProps.width);

  return (
    <Image
      src={imageProps?.src}
      sizes={sizes || "(max-width: 800px) 100vw, 800px"}
      placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
      blurDataURL={image ? image.asset.metadata?.lqip : undefined}
      {...nextImageProps}
    />
  );
}
