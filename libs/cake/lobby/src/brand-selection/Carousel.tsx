"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { getBrands } from "../queries/getBrands";
import { useEffect, useState } from "react";
import {
  AddIcon,
  Button,
  ChevronRightIcon,
  StarIcon,
} from "@danklabs/pattern-library/core";
import { WalletIcon } from "libs/cake/pattern-library/core/src/icons";
import {
  LogoSpace,
  SanityImage,
  portraitCropBuilder,
} from "@danklabs/cake/pattern-library/core";

type BrandsResult = Awaited<ReturnType<typeof getBrands>>;
type Brand = BrandsResult["brands"][0];

type Cart = {
  selectedBrands: Brand[];
  totalValue: number;
};

export type CarouselProps = {
  brands: BrandsResult;
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function addToCart(currentCart: Cart, brand: Brand): Cart {
  return { ...currentCart, totalValue: currentCart.totalValue + 100 };
}
function removeFromCart(currentCart: Cart, brand: Brand): Cart {
  return { ...currentCart, totalValue: currentCart.totalValue + 100 };
}

export function Carousel({ brands }: CarouselProps) {
  const [cart, setCart] = useState<Cart>({ selectedBrands: [], totalValue: 0 });
  const [[page, direction], setPage] = useState([0, 0]);
  const brandIdx = wrap(0, brands.brands.length, page);
  const selectedBrand = brands.brands[brandIdx];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  function handleAddButtonClick() {
    console.log("add", selectedBrand);
    setCart((currentCart) => {
      return { ...currentCart, totalValue: currentCart.totalValue + 100 };
    });
  }

  return (
    <div className="w-full h-full min-h-screen overflow-hidden flex flex-col px-5 py-5">
      <div className="w-full h-full grow overflow-hidden relative">
        <AnimatePresence initial={false} custom={direction}>
          <CarouselItem
            key={selectedBrand.slug}
            brand={selectedBrand}
            direction={direction}
            paginate={paginate}
            onAddButtonClick={() => handleAddButtonClick()}
          />
        </AnimatePresence>
      </div>
      <div className="h-16 flex flex-row items-center">
        <Button onClick={() => paginate(-1)} textColor="black">
          Left
        </Button>
        <span className="grow"></span>
        <Button onClick={() => paginate(-1)}>Right</Button>
      </div>
      <Summary cart={cart} />
    </div>
  );
}

function Summary({ cart }: { cart: Cart }) {
  useEffect(() => {}, [cart]);
  return (
    <div className="px-4 py-2 bg-black/50 rounded-full flex flex-row  text-sm">
      <div className="grow flex flex-row gap-4">
        <div className="flex flex-row items-center gap-2">
          <ChevronRightIcon />
          <span>$100/year</span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <WalletIcon />
          <span>${cart.totalValue}</span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <StarIcon />
          <span>7</span>
        </div>
      </div>

      <div>
        <Button className="flex flex-col gap-0">
          <div className="text-sm uppercase">Join</div>
        </Button>
      </div>
    </div>
  );
}

function CarouselItem({
  brand,
  direction,
  paginate,
  onAddButtonClick,
}: {
  brand: BrandsResult["brands"][0];
  direction: number;
  paginate(newDirection: number): void;
  onAddButtonClick(): void;
}) {
  return (
    <div className="w-full h-full absolute left-0 ">
      <motion.div
        className="w-full bg-black/30 rounded-xl aspect-[2/3] overflow-hidden"
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x);

          if (swipe < -swipeConfidenceThreshold) {
            paginate(1);
          } else if (swipe > swipeConfidenceThreshold) {
            paginate(-1);
          }
        }}
      >
        <div className="w-full h-full relative">
          {/* BACKGROUND IMAGE */}
          <figure className="absolute w-full h-full top-0 left-0">
            <SanityImage
              image={brand.passBackground!}
              alt={`${brand.name} Image`}
              fill
              imageBuilder={portraitCropBuilder(430)}
            />
          </figure>
          {/* GRADIENT OVERLAY */}
          <div className="absolute top-0 w-full h-full  margin-top-auto bg-gradient-to-t from-black to-black/50"></div>
          {/* BRAND CONTENT */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center p-5">
            <LogoSpace>
              <SanityImage
                alt={`${brand.name} Logo`}
                image={brand.passLogo!}
                height={0}
                width={0}
                style={{ height: "2.5rem", width: "auto" }}
              />
            </LogoSpace>
            <p className="text-base font-normal">{brand.summary}</p>
            <div className="mt-4">
              <Button background="white" onClick={onAddButtonClick}>
                <AddIcon /> <span className="uppercase">Add to Passport</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
