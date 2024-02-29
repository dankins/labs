"use client";
import {
  Button,
  FavoriteFilledIcon,
  FavoriteOutlineIcon,
  OutlineButton,
} from "@danklabs/pattern-library/core";
import { addFavorite, removeFavorite } from "../actions";
import { useState } from "react";
import { useToast } from "@danklabs/pattern-library/motion";

export function ToggleFavoriteButton({
  isFavorite: isFavoriteStart,
  slug,
}: {
  slug: string;
  isFavorite?: boolean;
}) {
  const [isFavorite, setIsFavorite] = useState(isFavoriteStart);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  async function handleToggle() {
    setLoading(true);
    await (isFavorite ? removeFavorite(slug) : addFavorite(slug));
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
