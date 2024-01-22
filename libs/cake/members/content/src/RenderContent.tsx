import { PortableText } from "@portabletext/react";
import { getImageDimensions, SanityImageSource } from "@sanity/asset-utils";
import {
  SanityImage,
  SanityImageType,
} from "@danklabs/cake/pattern-library/core";

const ContentImageComponent = ({
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

const components = {
  types: {
    image: ContentImageComponent,
  },
};

export function RenderContent({ blocks }: { blocks: any[] }) {
  return <PortableText value={blocks} components={components} />;
}
