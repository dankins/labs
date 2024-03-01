import {
  ChevronRightIcon,
  OutlineButton,
} from "@danklabs/pattern-library/core";
import { CMSBrand } from "./types";
import { MemberBenefits, MemberBenefitsLoading } from "./MemberBenefits";
import { Instagram, InstagramLoading } from "./Instagram";
import { TikTok, TikTokLoading } from "./TikTok";
import { SectionHeading } from "@danklabs/cake/pattern-library/core";
import { ToggleFavoriteButton } from "./ToggleFavoriteButton";
import { addFavoriteAction, removeFavoriteAction } from "../actions";

export function Content({
  memberId,
  brandId,
  brand,
  isFavorite,
}: {
  memberId: string;
  brandId: string;
  brand: CMSBrand;
  isFavorite: boolean;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3 flex flex-col gap-4">
        <SectionHeading>About {brand.name}</SectionHeading>
        <div className="text-base font-normal text-[#D5D5D5]">
          {brand.summary}
        </div>
        {/** SHOP */}
        <div className="flex flex-row gap-4">
          <ToggleFavoriteButton
            slug={brand.slug}
            addFavoriteAction={addFavoriteAction.bind(
              undefined,
              memberId,
              brandId,
              brand.slug
            )}
            removeFavoriteAction={removeFavoriteAction.bind(
              undefined,
              memberId,
              brandId,
              brand.slug
            )}
            isFavorite={isFavorite}
          />
          <ShopButton name={brand.name} website={brand.website} />
        </div>
      </div>
      <div className="md:w-2/3 flex flex-col gap-4">
        <MemberBenefits />
        <Instagram brand={brand} />
        <TikTok brand={brand} />
      </div>
    </div>
  );
}

function ShopButton({ name, website }: { name: string; website: string }) {
  return (
    <div className="mt-4">
      <OutlineButton
        background="transparent"
        textColor="white"
        className="text-xs uppercase"
      >
        <span>
          <ChevronRightIcon className="text-primary" /> <strong>Visit</strong>{" "}
          {name}
        </span>
      </OutlineButton>
    </div>
  );
}

export function ContentLoading() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3 flex flex-col gap-4">
        <SectionHeading>About ...</SectionHeading>
        <div className="text-base font-normal text-[#D5D5D5]">...</div>
        {/** SHOP */}
        <div className="flex flex-row gap-4">
          <ToggleFavoriteButton slug="..." isFavorite={false} />
          <ShopButton name={"..."} website={"..."} />
        </div>
      </div>
      <div className="md:w-2/3 flex flex-col gap-4">
        <MemberBenefitsLoading />
        <InstagramLoading />
        <TikTokLoading />
      </div>
    </div>
  );
}
