"use client";

import { ChevronRightIcon, Button } from "@danklabs/pattern-library/core";
import { useQueryStringUpdater } from "../util/searchParams";

export function SelectBrandsButton() {
  const updateQueryString = useQueryStringUpdater();

  function handleBrandClick() {
    updateQueryString("step", "brand_selection");
  }
  return (
    <Button
      background="white"
      textColor="black"
      className="uppercase mt-5 font-poppins"
      onClick={handleBrandClick}
    >
      Select My Brands <ChevronRightIcon />
    </Button>
  );
}
