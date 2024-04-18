import { getImageProps } from "next/image";

import { AspectRatioChoices, SanityImageType, buildImageProps } from "./utils";

export type ImageProps = {
  image: SanityImageType | null;
  aspectRatio: AspectRatioChoices;
  mediaQuery: string;
  width?: number;
};

export function SanityArtDirection({
  alt,
  images,
  className,
}: {
  alt: string;
  images: ImageProps[];
  className?: string;
}) {
  let imageProps = {};
  const preparedImages = images
    .filter((i) => i.image)
    .map((image) => {
      const sanityProps = buildImageProps(
        image.aspectRatio,
        image.image!,
        image.width
      );
      const {
        props: { srcSet, ...rest },
      } = getImageProps({
        alt,
        width: sanityProps.width,
        height: sanityProps.height,
        quality: 100,
        src: sanityProps.src,
        blurDataURL: sanityProps.blurDataURL,
      });

      imageProps = rest;

      return { ...image, srcSet };
    }, {});

  return (
    <picture className={className}>
      {preparedImages.map((i) => (
        <source key={i.srcSet} media={i.mediaQuery} srcSet={i.srcSet} />
      ))}
      <img {...imageProps} style={{ width: "100%", height: "auto" }} />
    </picture>
  );
}
