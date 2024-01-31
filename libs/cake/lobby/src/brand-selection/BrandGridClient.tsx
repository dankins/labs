"use client";
import type { getBrands } from "@danklabs/cake/cms";
import { LogoSpace, SanityImage } from "@danklabs/cake/pattern-library/core";
import type { getMemberByIAM } from "@danklabs/cake/services/admin-service";
import classNames from "classnames";
import { useState } from "react";
import "./GridItem.scss";
import {
  AddIcon,
  Button,
  ChevronRightIcon,
} from "@danklabs/pattern-library/core";
import { WalletIcon } from "libs/cake/pattern-library/core/src/icons";

type Cart = {
  selectedBrands: Brand[];
  totalValue: number;
};

type Brand = Awaited<ReturnType<typeof getBrands>>["brands"][0];
type Pass = NonNullable<
  Awaited<ReturnType<typeof getMemberByIAM>>
>["passport"]["passes"][0];

export function BrandGridClient({ brands }: { brands: Brand[] }) {
  const [cart, setCart] = useState<Cart>({ selectedBrands: [], totalValue: 0 });
  const [activeIdx, setActiveIdx] = useState<number>();
  const [shrinkIdx, setShrinkIdx] = useState<number>();
  function handleClick(idx: number) {
    if (idx !== activeIdx) {
      setActiveIdx(idx);
      setShrinkIdx(idx % 2 === 1 ? idx - 1 : idx + 1);
    } else {
      setActiveIdx(undefined);
      setShrinkIdx(undefined);
    }
  }
  function handleAddToPassport() {}
  return (
    <div className="flex flex-row flex-wrap">
      {brands.map((b, idx) => {
        let shrink = false;
        // check if there is a selection
        if (typeof activeIdx !== "undefined") {
          // if selection is odd, then shrink the preceding element
          if (activeIdx % 2 === 0) {
          }
        }
        return (
          <GridItem
            brand={b}
            onClick={() => handleClick(idx)}
            shrink={idx === shrinkIdx}
            active={idx === activeIdx}
            onAddToPassport={handleAddToPassport}
          />
        );
      })}
    </div>
  );
}

function GridItem({
  brand,
  pass,
  shrink,
  active,
  onClick,
}: {
  brand: Brand;
  pass?: Pass;
  active?: boolean;
  shrink?: boolean;
  onClick(): void;
  onAddToPassport(): void;
}) {
  function handleClick() {
    onClick();
  }

  return (
    <div
      className={classNames(
        "w-full BrandGridItem",
        active && "BrandGridItem-active",
        shrink && "BrandGridItem-shrink"
      )}
    >
      <div
        className={classNames("w-full aspect-[2/3] relative group")}
        onClick={handleClick}
      >
        <figure className="absolute top-0 w-full h-full">
          {brand.passBackground && (
            <SanityImage
              alt={`${brand.name} Logo`}
              image={brand.passBackground}
              height={0}
              width={0}
              style={{ height: "100%", width: "100%" }}
            />
          )}
        </figure>
        <div className="w-full h-full absolute top-0 margin-top-auto bg-black/50 group-hover:bg-transparent"></div>
        {/** COLLAPSED CONTENT */}
        {!active && !shrink && (
          <div className={classNames("absolute top-0 w-full h-full p-4")}>
            <LogoSpace>
              {brand.passLogo ? (
                <SanityImage
                  alt={`${brand.name} Logo`}
                  image={brand.passLogo}
                  height={0}
                  width={0}
                  style={{ height: "2.5rem", width: "auto" }}
                />
              ) : (
                <h1 className="text-white text-5xl">{brand.name}</h1>
              )}
            </LogoSpace>
          </div>
        )}
        {/** EXPANDED CONTENT */}
        {active && (
          <div
            className={classNames(
              "absolute top-0 left-0 w-full h-full p-4 flex flex-col"
            )}
          >
            <div className="grow flex flex-col items-center justify-center gap-4">
              <SanityImage
                alt={`${brand.name} Logo`}
                image={brand.passLogo!}
                height={0}
                width={0}
                style={{ height: "2.5rem", width: "auto" }}
              />

              <div className="text-base font-normal my-5">
                Something about LuLuLemon and and early access and free shipping
                for all of your online orders.
              </div>
              <Button
                background="black/70"
                border="primary"
                className="uppercase text-black"
              >
                <ChevronRightIcon />{" "}
                <span className="text-white">Learn More</span>
              </Button>
            </div>

            <hr />
            <div className="flex flex-row m-4">
              <div className="grow flex flex-col gap-2  justify-center">
                <div className="grow flex flex-row gap-2 items-center text-primary">
                  <WalletIcon /> <span>Cake Card</span>
                </div>
                <div className="text-white text-5xl">$100</div>
              </div>
              <Button background="white uppercase my-3">
                <AddIcon /> Add to Passport
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
