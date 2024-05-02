import Image from "next/image";
import { AspectRatioChoices, SanityImageType, buildImageProps } from "./utils";

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
      sizes={sizes}
      placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
      blurDataURL={image ? image.asset.metadata?.lqip : undefined}
      quality={nextImageProps.quality || 100}
      {...nextImageProps}
    />
  );
}
