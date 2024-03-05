"use client";
import {
  FavoriteFilledIcon,
  FavoriteOutlineIcon,
  OutlineButton,
} from "@danklabs/pattern-library/core";
import { useState } from "react";
import { useToast } from "@danklabs/pattern-library/motion";

export function ToggleFavoriteButton({
  isFavorite: isFavoriteStart,
  slug,
  addFavoriteAction,
  removeFavoriteAction,
}: {
  slug: string;
  isFavorite?: boolean;
  addFavoriteAction?(): Promise<void>;
  removeFavoriteAction?(): Promise<void>;
}) {
  const [isFavorite, setIsFavorite] = useState(isFavoriteStart);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  async function handleToggle() {
    if (!addFavoriteAction || !removeFavoriteAction) {
      throw new Error("not ready");
    }
    setLoading(true);
    await (isFavorite ? removeFavoriteAction() : addFavoriteAction());
    setLoading(false);
    toast.addToast(
      isFavorite ? `Removed from favorites` : `Added to favorites`
    );
    setIsFavorite(!isFavorite);
  }
  return (
    <div className="mt-4">
      <OutlineButton
        background="transparent"
        textColor="white"
        className="text-xs uppercase"
        onClick={handleToggle}
        loading={loading}
        icon={
          isFavorite ? (
            <FavoriteFilledIcon className="text-primary text-lg" />
          ) : (
            <FavoriteOutlineIcon className="text-primary text-lg" />
          )
        }
      >
        {isFavorite ? (
          <span>
            <strong>Remove</strong> from Favorites
          </span>
        ) : (
          <span>
            <strong>Add</strong> to Favorites
          </span>
        )}
      </OutlineButton>
    </div>
  );
}
