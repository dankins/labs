import { getImageProps } from "next/image";
import { ImageProps } from "./SanityArtDirection";
import { SanityImageType, buildImageProps } from "./utils";

export function SanityBackgroundImage({
  children,
  alt,
  images,
  className,
}: {
  children: React.ReactNode;
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

  const imageSet = buildImageSet(preparedImages);
  const style = {
    backgroundImage: imageSet,
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

function buildImageSet(
  images: {
    srcSet: string | undefined;
    image: SanityImageType | null;
    aspectRatio: "portrait" | "landscape" | undefined;
    mediaQuery: string;
  }[]
) {
  // Map each image object to a formatted string for the image-set function
  const imageSetValues = images.map(({ srcSet, mediaQuery }) => {
    // If a media query is provided, append it to the srcSet; otherwise, return srcSet as is
    return mediaQuery ? `url("${srcSet}") ${mediaQuery}` : srcSet;
  });

  // Join all image set values with a comma, according to the image-set syntax
  const computedValue = imageSetValues.join(", ");

  // Return the full image-set CSS function as a string
  return `image-set(${computedValue})`;
}
