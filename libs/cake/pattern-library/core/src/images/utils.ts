import imageUrlBuilder from "@sanity/image-url";
import type {
  SanityAsset,
  SanityImageObject,
  SanityImageSource,
} from "@sanity/image-url/lib/types/types";
import type {
  SanityClientOrProjectDetails,
  UseNextSanityImageOptions,
  UseNextSanityImageBuilderOptions,
  UseNextSanityImageBuilder,
  UseNextSanityImageDimensions,
  ImageUrlBuilder,
} from "next-sanity-image";
import { SanityReference } from "next-sanity";
import Image, { ImageLoader, getImageProps } from "next/image";
import { sanityClient } from "@danklabs/integrations/sanitycms";

const DEFAULT_FALLBACK_IMAGE_QUALITY = 100;

export type AspectRatioChoices =
  | "portrait"
  | "landscape"
  | "square"
  | "wallet"
  | "ultrawide"
  | undefined;

export type SanityImageType = {
  readonly _key: string | null;
  readonly _type: string;
  asset: {
    _type: "reference" | "sanity.imageAsset" | "sanity.fileAsset";
    metadata?: {
      dimensions: {
        height: number;
        width: number;
        aspectRatio: number;
        _type?: "sanity.imageDimensions" | undefined;
      } | null;
      lqip?: any;
    };
  };
};

export const DEFAULT_IMAGE_BUILDER: UseNextSanityImageBuilder = (
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

export function getImageDimensions(id: string): UseNextSanityImageDimensions {
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

export function getSanityRefId(image: SanityImageSource): string {
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

export function portraitCropBuilder(width: number) {
  return (
    imageUrlBuilder: ImageUrlBuilder,
    options: UseNextSanityImageBuilderOptions
  ) =>
    imageUrlBuilder
      .width(width)
      .height(Math.round((width * 3) / 2))
      .fit("crop");
}

export function walletCropBuilder(width: number) {
  return (
    imageUrlBuilder: ImageUrlBuilder,
    options: UseNextSanityImageBuilderOptions
  ) =>
    imageUrlBuilder
      .width(width)
      .height(Math.round((width * 2) / 3))
      .fit("crop");
}

export function landscapeCropBuilder(width: number) {
  return (
    imageUrlBuilder: ImageUrlBuilder,
    options: UseNextSanityImageBuilderOptions
  ) =>
    imageUrlBuilder
      .width(width)
      .height(Math.round((width * 9) / 16))
      .fit("crop");
}
export function squareCropBuilder(width: number) {
  return (
    imageUrlBuilder: ImageUrlBuilder,
    options: UseNextSanityImageBuilderOptions
  ) => imageUrlBuilder.width(width).height(width).fit("crop");
}

export function ultrawideCropBuilder(width: number) {
  return (
    imageUrlBuilder: ImageUrlBuilder,
    options: UseNextSanityImageBuilderOptions
  ) =>
    imageUrlBuilder
      .width(options.width || width)
      .height(Math.round((options.width || width * 9) / 21))
      .fit("crop");
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

  return {
    loader,
    src: baseImgBuilderInstance.url() as string,
    width,
    height,
  };
}

export function buildImageProps(
  aspectRatio: AspectRatioChoices,
  image: SanityImageSource,
  width?: number | `${number}` | undefined
) {
  const options: Parameters<typeof sanityImageHelper>[2] = {
    imageBuilder: imageBuilderFactory(aspectRatio, width),
  };
  return sanityImageHelper(sanityClient, image, options) as any;
}

function imageBuilderFactory(
  aspectRatio: AspectRatioChoices,
  width?: number | `${number}` | undefined
) {
  switch (aspectRatio) {
    case "portrait":
      return portraitCropBuilder(
        typeof width === "string" ? parseInt(width) : width || 768
      );
    case "landscape":
      return landscapeCropBuilder(
        typeof width === "string" ? parseInt(width) : width || 2880
      );
    case "square":
      return squareCropBuilder(
        typeof width === "string" ? parseInt(width) : width || 500
      );
    case "wallet":
      return walletCropBuilder(
        typeof width === "string" ? parseInt(width) : width || 500
      );
    case "ultrawide":
      return ultrawideCropBuilder(
        typeof width === "string" ? parseInt(width) : width || 1440
      );
    default:
      return undefined;
  }
}
