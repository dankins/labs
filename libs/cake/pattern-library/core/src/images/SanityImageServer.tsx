import { sanityClient } from "@danklabs/integrations/sanitycms";
import imageUrlBuilder from "@sanity/image-url";
import type {
  SanityAsset,
  SanityImageObject,
  SanityImageSource,
} from "@sanity/image-url/lib/types/types";
import { SanityReference } from "next-sanity";
import type {
  SanityClientOrProjectDetails,
  UseNextSanityImageBuilder,
  UseNextSanityImageDimensions,
  UseNextSanityImageOptions,
  UseNextSanityImageBuilderOptions,
  ImageUrlBuilder,
} from "next-sanity-image";
import Image, { ImageLoader } from "next/image";

function getSanityRefId(image: SanityImageSource): string {
  if (typeof image === "string") {
    return image;
  }

  const obj = image as SanityImageObject;
  const ref = image as SanityReference;
  const img = image as SanityAsset;

  if (obj.asset) {
    return obj.asset._ref || (obj.asset as SanityAsset)._id;
  }

  return ref._ref || img._id || "";
}

const DEFAULT_FALLBACK_IMAGE_QUALITY = 75;

const DEFAULT_IMAGE_BUILDER: UseNextSanityImageBuilder = (
  imageUrlBuilder,
  options
) => {
  const result = imageUrlBuilder
    .quality(options.quality || DEFAULT_FALLBACK_IMAGE_QUALITY)
    .fit("clip");

  if (options.width !== null) {
    return result.width(options.width);
  }

  return result;
};

function getImageDimensions(id: string): UseNextSanityImageDimensions {
  const dimensions = id.split("-")[2];

  const [width, height] = dimensions
    .split("x")
    .map((num: string) => parseInt(num, 10));
  const aspectRatio = width / height;

  return { width, height, aspectRatio };
}

function getCroppedDimensions(
  image: SanityImageSource,
  baseDimensions: UseNextSanityImageDimensions
): UseNextSanityImageDimensions {
  const crop = (image as SanityImageObject).crop;

  if (!crop) {
    return baseDimensions;
  }

  const { width, height } = baseDimensions;
  const croppedWidth = width * (1 - (crop.left + crop.right));
  const croppedHeight = height * (1 - (crop.top + crop.bottom));

  return {
    width: croppedWidth,
    height: croppedHeight,
    aspectRatio: croppedWidth / croppedHeight,
  };
}

export function sanityImageHelper(
  sanityClient: SanityClientOrProjectDetails,
  image: SanityImageSource | null,
  options?: UseNextSanityImageOptions
) {
  const imageBuilder = options?.imageBuilder || DEFAULT_IMAGE_BUILDER;
  if (!image) {
    return null;
  }

  // If the image has an alt text but does not contain an actual asset, the id will be
  // undefined: https://github.com/bundlesandbatches/next-sanity-image/issues/14
  const id = image ? getSanityRefId(image) : null;
  if (!id) {
    return null;
  }

  const originalImageDimensions = getImageDimensions(id);
  const croppedImageDimensions = getCroppedDimensions(
    image,
    originalImageDimensions
  );

  const loader: ImageLoader = ({ width, quality }) => {
    return (
      imageBuilder(imageUrlBuilder(sanityClient).image(image).auto("format"), {
        width,
        originalImageDimensions,
        croppedImageDimensions,
        quality: quality || null,
      }).url() || ""
    );
  };

  const baseImgBuilderInstance = imageBuilder(
    imageUrlBuilder(sanityClient).image(image).auto("format"),
    {
      width: null,
      originalImageDimensions,
      croppedImageDimensions,
      quality: null,
    }
  );

  const width =
    baseImgBuilderInstance.options.width ||
    (baseImgBuilderInstance.options.maxWidth
      ? Math.min(
          baseImgBuilderInstance.options.maxWidth,
          croppedImageDimensions.width
        )
      : croppedImageDimensions.width);

  const height =
    baseImgBuilderInstance.options.height ||
    (baseImgBuilderInstance.options.maxHeight
      ? Math.min(
          baseImgBuilderInstance.options.maxHeight,
          croppedImageDimensions.height
        )
      : Math.round(width / croppedImageDimensions.aspectRatio));

  return {
    loader,
    src: baseImgBuilderInstance.url() as string,
    width,
    height,
  };
}

type SanityImageType = {
  readonly _key: string | null;
  readonly _type: string;
  asset: {
    _type: "reference" | "sanity.imageAsset" | "sanity.fileAsset";
    metadata?: {
      lqip?: any;
    };
  };
};

type SanityImageProps = {
  image: SanityImageType;
  aspectRatio?: "portrait";
} & Omit<React.ComponentProps<typeof Image>, "src">;

function portraitCropBuilder(width: number) {
  return (
    imageUrlBuilder: ImageUrlBuilder,
    options: UseNextSanityImageBuilderOptions
  ) =>
    imageUrlBuilder
      .width(width)
      .height((width * 3) / 2)
      .fit("crop");
}

export function SanityImageServer({
  image,
  sizes,
  aspectRatio,
  ...nextImageProps
}: SanityImageProps) {
  const imageBuilder = (() => {
    if (aspectRatio && aspectRatio === "portrait") {
      return portraitCropBuilder(482);
    }
    return;
  })();
  const options: Parameters<typeof sanityImageHelper>[2] = { imageBuilder };
  const imageProps = sanityImageHelper(sanityClient, image, options) as any;
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
