"use client";
import classNames from "classnames";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCookies } from "react-cookie";

import {
  WalletIcon,
  LogoSpace,
  SanityImage,
} from "@danklabs/cake/pattern-library/core";
import {
  AddIcon,
  Button,
  ChevronRightIcon,
  Badge,
  CheckCircleIcon,
} from "@danklabs/pattern-library/core";

import { SelectionSummary } from "./SelectionSummary";
import "./GridItem.scss";
import type { Brand, Cart, Pass } from "./types";
import { CartCookie } from "../cookie";

function addToCart(
  currentCart: Cart,
  brand: Brand,
  voucherAmount: number
): Cart {
  const selectionMap: { [key: string]: Brand } = {
    ...currentCart.selectionMap,
    [brand.slug]: brand,
  };
  console.log("add to cart", selectionMap);
  return {
    selectionMap,
    selectionCount: currentCart.selectionCount + 1,
    totalValue: currentCart.totalValue + voucherAmount,
    loaded: true,
  };
}
function removeFromCart(
  currentCart: Cart,
  brand: Brand,
  voucherAmount: number
): Cart {
  const { [brand.slug]: deleteThis, ...selectionMap } =
    currentCart.selectionMap;
  return {
    selectionMap,
    selectionCount: currentCart.selectionCount - 1,
    totalValue: currentCart.totalValue - voucherAmount,
    loaded: true,
  };
}
function togglePass(
  currentCart: Cart,
  brand: Brand,
  voucherAmount: number
): Cart {
  return currentCart.selectionMap[brand.slug]
    ? removeFromCart(currentCart, brand, voucherAmount)
    : addToCart(currentCart, brand, voucherAmount);
}

export function BrandGridClient({
  brands,
  vouchers,
}: {
  brands: Brand[];
  vouchers: { [slug: string]: number };
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["invitation-cart"]);
  useEffect(() => {
    const cart: CartCookie = cookies["invitation-cart"];
    if (!cart) {
      setCart({
        selectionMap: {},
        selectionCount: 0,
        totalValue: 0,
        loaded: true,
      });
      return;
    }
    console.log("cart", cart);
    const selectionMap: { [key: string]: Brand } = {};
    brands.forEach((b) => {
      if (cart?.selectedBrands.includes(b.slug)) {
        selectionMap[b.slug] = b;
      }
    });
    setCart({
      selectionMap,
      selectionCount: cart.selectedBrands.length,
      totalValue: cart.totalValue,
      loaded: true,
    });
  }, []);
  const [cart, setCart] = useState<Cart>({
    selectionCount: 0,
    selectionMap: {},
    totalValue: 0,
    loaded: false,
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
  function handleAddToPassport(brand: Brand, voucherAmount: number) {
    console.log("handleAddToPassport");
    // setCart((currentCart) => {
    //   const updatedCart = togglePass(currentCart, brand, voucherAmount);
    //   const updatedCookie: CartCookie = {
    //     selectedBrands: Object.keys(updatedCart.selectionMap),
    //     totalValue: updatedCart.totalValue,
    //   };
    //   setCookie("invitation-cart", updatedCookie);
    //   return updatedCart;
    // });
  }
  return (
    <>
      <div className="flex flex-row flex-wrap mb-[120px]">
        {brands.map((b, idx) => (
          <GridItem
            key={b.slug}
            brand={b}
            onClick={() => handleClick(idx)}
            shrink={idx === shrinkIdx}
            active={idx === activeIdx}
            selected={typeof cart.selectionMap[b.slug] === "object"}
            onAddToPassport={() => handleAddToPassport(b, vouchers[b.slug])}
            voucherAmount={vouchers[b.slug]}
          />
        ))}
      </div>
      <div className="fixed bottom-0 left-0 my-5 w-full">
        <SelectionSummary cart={cart} />
      </div>
    </>
  );
}

function GridItem({
  brand,
  shrink,
  active,
  selected,
  voucherAmount,
  onClick,
  onAddToPassport,
}: {
  brand: Brand;
  pass?: Pass;
  active?: boolean;
  shrink?: boolean;
  selected?: boolean;
  voucherAmount: number;
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
          <>
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
            <div
              className={classNames(
                "absolute bottom-0 left-0 w-full p-4 flex flex-row"
              )}
            >
              <Badge>
                <WalletIcon /> ${voucherAmount}
              </Badge>
              <span className="grow"></span>
              {selected && (
                <Badge>
                  <CheckCircleIcon /> In Passport
                </Badge>
              )}
            </div>
          </>
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
                <ChevronRightIcon className="fill-white" />{" "}
                <span className="text-white">Learn More</span>
              </Button>
            </div>

            <hr />
            <div className="flex flex-row m-4">
              <div className="grow flex flex-col gap-2  justify-center">
                <div className="grow flex flex-row gap-2 items-center text-primary">
                  <WalletIcon /> <span>Cake Card</span>
                </div>
                <div className="text-white text-5xl">${voucherAmount}</div>
              </div>
              {selected ? (
                <Button
                  className="uppercase my-3 bg-white/70"
                  onClick={handleAddToPassport}
                >
                  <AddIcon /> Selected
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
