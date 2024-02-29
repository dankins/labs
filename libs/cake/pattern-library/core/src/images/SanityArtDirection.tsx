import { getImageProps } from "next/image";

import { SanityImageType, buildImageProps } from "./utils";

export type ImageProps = {
  image: SanityImageType | null;
  aspectRatio: "portrait" | "landscape" | undefined;
  mediaQuery: string;
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
      const sanityProps = buildImageProps(image.aspectRatio, image.image!);
      const {
        props: { srcSet, ...rest },
      } = getImageProps({
        alt,
        width: sanityProps.width,
        height: sanityProps.height,
        quality: 100,
        src: sanityProps.src,
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
