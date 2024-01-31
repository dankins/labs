"use client";
import type { getBrands } from "@danklabs/cake/cms";
import { LogoSpace, SanityImage } from "@danklabs/cake/pattern-library/core";
import type { getMemberByIAM } from "@danklabs/cake/services/admin-service";
import classNames from "classnames";
import { useRef, useState } from "react";
import "./GridItem.scss";
import {
  AddIcon,
  Button,
  ChevronRightIcon,
} from "@danklabs/pattern-library/core";
import { WalletIcon } from "libs/cake/pattern-library/core/src/icons";
import { SelectionSummary } from "./SelectionSummary";

export type Cart = {
  selectionMap: { [key: string]: Brand };
  totalValue: number;
  selectionCount: number;
};

type Brand = Awaited<ReturnType<typeof getBrands>>["brands"][0];
type Pass = NonNullable<
  Awaited<ReturnType<typeof getMemberByIAM>>
>["passport"]["passes"][0];

function addToCart(currentCart: Cart, brand: Brand): Cart {
  const selectionMap: { [key: string]: Brand } = {
    ...currentCart.selectionMap,
    [brand.slug]: brand,
  };
  return {
    selectionMap,
    selectionCount: currentCart.selectionCount + 1,
    totalValue: currentCart.totalValue + 100,
  };
}
function removeFromCart(currentCart: Cart, brand: Brand): Cart {
  const { [brand.slug]: deleteThis, ...selectionMap } =
    currentCart.selectionMap;
  return {
    selectionMap,
    selectionCount: currentCart.selectionCount - 1,
    totalValue: currentCart.totalValue - 100,
  };
}
function togglePass(currentCart: Cart, brand: Brand): Cart {
  return currentCart.selectionMap[brand.slug]
    ? removeFromCart(currentCart, brand)
    : addToCart(currentCart, brand);
}

export function BrandGridClient({ brands }: { brands: Brand[] }) {
  const [cart, setCart] = useState<Cart>({
    selectionMap: {},
    selectionCount: 0,
    totalValue: 0,
  });
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
  function handleAddToPassport(brand: Brand) {
    console.log("handleAddToPassport");
    setCart((currentCart) => togglePass(currentCart, brand));
  }
  return (
    <div className="flex flex-row flex-wrap">
      {brands.map((b, idx) => (
        <GridItem
          key={b.slug}
          brand={b}
          onClick={() => handleClick(idx)}
          shrink={idx === shrinkIdx}
          active={idx === activeIdx}
          selected={typeof cart.selectionMap[b.slug] === "object"}
          onAddToPassport={() => handleAddToPassport(b)}
        />
      ))}
      <div className="fixed bottom-0 left-0 my-5 w-full">
        <SelectionSummary cart={cart} />
      </div>
    </div>
  );
}

function GridItem({
  brand,
  pass,
  shrink,
  active,
  selected,
  onClick,
  onAddToPassport,
}: {
  brand: Brand;
  pass?: Pass;
  active?: boolean;
  shrink?: boolean;
  selected?: boolean;
  onClick(): void;
  onAddToPassport(): void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  function handleClick() {
    onClick();
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  function handleAddToPassport(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    onAddToPassport();
  }

  return (
    <div
      ref={ref}
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
        <div className="w-full h-full absolute top-0 margin-top-auto bg-black/50 "></div>
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
              {selected ? (
                <Button
                  background="white/50"
                  className="uppercase my-3"
                  onClick={handleAddToPassport}
                >
                  <AddIcon /> In Passport
                </Button>
              ) : (
                <Button
                  background="white"
                  className="uppercase my-3"
                  onClick={handleAddToPassport}
                >
                  <AddIcon /> Add to Passport
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
