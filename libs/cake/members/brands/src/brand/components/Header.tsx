import { SanityImageServer } from "@danklabs/cake/pattern-library/core";
import { CMSBrand } from "./types";
import {
  Badge,
  Button,
  FavoriteFilledIcon,
} from "@danklabs/pattern-library/core";
import { FaHeart } from "react-icons/fa";
import { ToggleFavoriteButton } from "./ToggleFavoriteButton";

export function Header({ brand }: { brand: CMSBrand }) {
  return (
    <div className="flex flex-col md:flex-row items-center md:h-32">
      <div className="md:w-1/3 flex flex-row justify-center">
        <SanityImageServer
          alt={`${brand.name} Logo`}
          image={brand.passLogo!}
          height={0}
          width={0}
          style={{ height: "2.5rem", width: "auto" }}
          sizes="(max-width: 768px) 480px, 1024px"
        />
      </div>
      <div className="grow flex flex-row items-center">
        <h1>PLAY</h1>
      </div>
      <div className="flex flex-row gap-3">
        <Badge>
          <FaHeart /> POPULAR
        </Badge>
        <ToggleFavoriteButton />
      </div>
    </div>
  );
}
