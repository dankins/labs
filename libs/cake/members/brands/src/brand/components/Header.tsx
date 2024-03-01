import { SanityImageServer } from "@danklabs/cake/pattern-library/core";
import { CMSBrand } from "./types";
import {
  Badge,
  Button,
  CircleButton,
  FavoriteFilledIcon,
  FavoriteOutlineIcon,
  OutlineButton,
  PlayIcon,
} from "@danklabs/pattern-library/core";
import { FaHeart } from "react-icons/fa";
import {
  getImageDimensions,
  getSanityRefId,
} from "@danklabs/cake/pattern-library/core";

export function Header({ brand }: { brand: CMSBrand }) {
  const hasVideo = false;
  const { aspectRatio } = getImageDimensions(getSanityRefId(brand.passLogo!));
  const imageSize =
    aspectRatio >= 1
      ? { width: "100%", height: "auto" }
      : { width: "auto", height: "100%" };

  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="md:w-1/3 flex flex-row justify-center items-center">
        <div className="w-[200px] h-[200px] flex flex-row justify-center items-center">
          <SanityImageServer
            alt={`${brand.name} Logo`}
            image={brand.passLogo!}
            width={aspectRatio >= 1 ? 245 : 245 * aspectRatio} // 70% of 350px is 245px
            height={aspectRatio >= 1 ? 245 / aspectRatio : 245}
            style={imageSize}
          />
        </div>
      </div>
      <div className="grow flex flex-row items-center justify-center">
        {hasVideo ? (
          <CircleButton size={24} background="black/50">
            <PlayIcon className="fill-white text-2xl" />
          </CircleButton>
        ) : (
          <div className="w-[88px] h-[88px]" />
        )}
      </div>
      <div className="flex flex-row gap-3 self-start">
        <Badge>
          <FaHeart /> POPULAR
        </Badge>
      </div>
    </div>
  );
}

export function HeaderLoading() {
  return (
    <div className="flex flex-col md:flex-row items-center md:h-32">
      <div className="md:w-1/3 flex flex-row justify-center">
        <div className="w-[350px] aspect-[1/1]"></div>
      </div>
      <div className="grow flex flex-row items-center">
        <h1>PLAY</h1>
      </div>
      <div className="flex flex-row gap-3">
        <Badge>
          <FaHeart /> POPULAR
        </Badge>
        <OutlineButton
          background="transparent"
          textColor="white"
          className="text-xs uppercase"
          disabled
        >
          <FavoriteOutlineIcon className="text-primary text-lg stroke-[6px]" />
          <span>
            <strong>Add</strong> to Favorites
          </span>
        </OutlineButton>
      </div>
    </div>
  );
}
