import {
  SanityImage,
  SanityImageType,
} from "@danklabs/cake/pattern-library/core";

export const ContentImageComponent = ({
  value,
  isInline,
}: {
  value: SanityImageType;
  isInline: boolean;
}) => {
  // @ts-ignore make value be SanityImageSource to align types
  const { width, height } = getImageDimensions(value);

  return <SanityImage image={value} alt="" width={width} height={height} />;
};
