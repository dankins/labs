import Image from "next/image";
import { SanityImage, SanityImageType } from "../images";

export type FeatureImageContainerProps = {
  children: React.ReactNode;
  image: SanityImageType;
  overlay?: React.ReactNode;
};

export function FeatureImageContainer({
  image,
  overlay,
  children,
}: FeatureImageContainerProps) {
  return (
    <div className="w-full h-screen relative">
      <figure className="absolute top-0 left-0 w-full h-full">
        <SanityImage
          image={image}
          alt={"Background Image"}
          fill
          aspectRatio="portrait"
        />
      </figure>
      {overlay}
      <div className="absolute top-0 left-0 w-full h-full">{children}</div>
    </div>
  );
}
