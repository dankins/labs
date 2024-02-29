import {
  ChevronRightIcon,
  OutlineButton,
} from "@danklabs/pattern-library/core";
import { CMSBrand } from "./types";
import { MemberBenefits } from "./MemberBenefits";
import { Instagram } from "./Instagram";
import { TikTok } from "./TikTok";
import { SectionHeading } from "@danklabs/cake/pattern-library/core";

export function Content({ brand }: { brand: CMSBrand }) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3 flex flex-col gap-4">
        <SectionHeading>About {brand.name}</SectionHeading>
        <div className="text-base font-normal text-[#D5D5D5]">
          {brand.summary}
        </div>
        {/** SHOP */}
        <div className="mt-4">
          <OutlineButton
            background="transparent"
            textColor="white"
            className="text-xs"
          >
            <ChevronRightIcon /> <span>Visit {brand.name}</span>
          </OutlineButton>
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
