"use client";

import {
  SanityImage,
  SanityImageType,
} from "@danklabs/cake/pattern-library/core";
import {
  Button,
  FavoriteFilledIcon,
  FavoriteOutlineIcon,
} from "@danklabs/pattern-library/core";
import { useState } from "react";
import classNames from "classnames";

export type FavoritesGridProps = {
  brands: {
    brandId: string;
    name: string;
    passLogo: SanityImageType;
  }[];
  removeMultipleFavorites(brandIds: string[]): Promise<void>;
};
export function FavoritesGrid({
  removeMultipleFavorites,
  brands,
}: FavoritesGridProps) {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [removeMap, setRemoveMap] = useState<{ [key: string]: boolean }>({});
  function toggle(brandId: string) {
    console.log("toggle", brandId);
    if (removeMap[brandId]) {
      setRemoveMap((current) => {
        const { [brandId]: _, ...rest } = current;
        return rest;
      });
    } else {
      setRemoveMap((current) => {
        return { [brandId]: true, ...current };
      });
    }
  }

  async function handleSubmit() {
    setLoading(true);
    await removeMultipleFavorites(Object.keys(removeMap));
    setLoading(false);
  }

  async function handleCancel() {
    setEditMode(false);
    setRemoveMap({});
  }
  const dirty = Object.keys(removeMap).length > 0;
  return (
    <>
      <div className="my-6 flex flex-row justify-end">
        {!editMode ? (
          <Button
            onClick={() => setEditMode(true)}
            background="black"
            textColor="white"
          >
            Edit
          </Button>
        ) : (
          <div className="flex flex-row gap-4">
            <Button disabled={!dirty} onClick={handleSubmit} loading={loading}>
              Save
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {brands.map((b) => {
          return (
            <div
              key={b.brandId}
              className="p-2 aspect-[1/1] bg-black/40 flex flex-col cursor-pointer"
              onClick={() => toggle(b.brandId)}
            >
              <div className="flex justify-end m-h-[24px]">
                {removeMap[b.brandId] ? (
                  <FavoriteOutlineIcon className="w-[24px] h-[24px]" />
                ) : (
                  <FavoriteFilledIcon
                    className={classNames(
                      "w-[24px] h-[24px]",
                      !editMode && "invisible"
                    )}
                  />
                )}
              </div>
              <div className="grow p-5 flex flex-col items-center justify-center">
                <SanityImage
                  alt={`${b.name} logo`}
                  image={b.passLogo!}
                  width={400}
                  height={200}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
