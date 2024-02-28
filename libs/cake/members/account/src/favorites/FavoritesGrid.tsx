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
    slug: string;
    name: string;
    passLogo: SanityImageType;
  }[];
};
export function FavoritesGrid({ brands }: FavoritesGridProps) {
  const [editMode, setEditMode] = useState(false);
  const [removeMap, setRemoveMap] = useState<{ [key: string]: boolean }>({});
  function toggle(slug: string) {
    console.log("toggle", slug);
    if (removeMap[slug]) {
      setRemoveMap((current) => {
        const { [slug]: _, ...rest } = current;
        return rest;
      });
    } else {
      setRemoveMap((current) => {
        return { [slug]: true, ...current };
      });
    }
  }

  function handleCancel() {
    setEditMode(false);
    setRemoveMap({});
  }
  const dirty = Object.keys(removeMap).length > 0;
  return (
    <>
      <div className="my-6 flex flex-row justify-end">
        {!editMode ? (
          <Button onClick={() => setEditMode(true)}>Edit</Button>
        ) : (
          <div className="flex flex-row gap-4">
            <Button disabled={!dirty}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {brands.map((b) => {
          return (
            <div
              key={b.slug}
              className="p-2 aspect-[1/1] bg-white/20 flex flex-col cursor-pointer"
              onClick={() => toggle(b.slug)}
            >
              <div className="flex justify-end m-h-[24px]">
                {removeMap[b.slug] ? (
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
