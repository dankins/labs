import { FeatureImageContainer } from "@danklabs/cake/pattern-library/core";
import { TriggerScrollButton } from "./TriggerScrollButton";
import {
  ArrowDownIcon,
  Button,
  ChevronRightIcon,
} from "@danklabs/pattern-library/core";
import { SelectBrandsButton } from "./SelectMyBrandsButton";

export function WelcomePanel({ heroImage }: { heroImage: any }) {
  return (
    <FeatureImageContainer
      image={heroImage}
      overlay={<div className="w-full h-full absolute top-0 bg-black/40"></div>}
    >
      <div className="h-full flex flex-col items-end px-5">
        <div className="grow flex flex-col justify-center items-center gap-4 pt-[300px]">
          <h1 className="text-[#FFF6DA] text-6xl font-fancy">
            Welcome, Margaret.
          </h1>
          <span className="text-base font-normal leading-6">
            Katherine invited you to become a member of Cake, the invitation
            only club where you gain insider privileges to some of the worlds
            most exclusive and exciting fashion brands. Select your brands, and
            see what it means to be on the inside.
          </span>
          <div>
            <SelectBrandsButton />
          </div>
        </div>
        <div className="w-full mt-[150px] pb-25 flex flex-row items-center justify-center">
          <a
            href="#panel1"
            className="uppercase flex flex-col items-center justify-center my-10 font-poppins scroll-smooth"
          >
            <div className="p-4">How does it work?</div>
            <ArrowDownIcon />
          </a>
        </div>
      </div>
    </FeatureImageContainer>
  );
}
