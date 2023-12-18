"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BrandListSelection } from "../queries/getBrands";
import { updateQueryString, useQueryStringUpdater } from "../util/searchParams";
import classNames from "classnames";

export type BrandCardProps = {
  brand: BrandListSelection;
  selected: boolean;
  selection: string[];
  selectable: boolean;
};

export function BrandCard({
  brand,
  selected,
  selectable,
  selection,
}: BrandCardProps) {
  const updateQueryString = useQueryStringUpdater();

  function handleClick() {
    if (!selectable) {
      return;
    }
    updateQueryString("brands", brand.slug, selected ? "remove" : "append");
  }
  return (
    <div
      className={classNames(
        "p-5 border",
        selected && "border-red-500",
        selectable ? "cursor-pointer" : "cursor-not-allowed"
      )}
      onClick={handleClick}
    >
      <h1>{brand.name}</h1>
    </div>
  );
}
