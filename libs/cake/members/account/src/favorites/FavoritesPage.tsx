import { auth } from "@clerk/nextjs/server";
import { members } from "@danklabs/cake/services/admin-service";
import {
  AddIcon,
  Button,
  FavoriteFilledIcon,
  PrimaryButton,
} from "@danklabs/pattern-library/core";
import { Suspense } from "react";
import { FavoritesGrid } from "./FavoritesGrid";
import { removeMultipleFavorites } from "../actions";

export async function FavoritesPage() {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}

async function Component() {
  const { userId } = auth().protect();

  const faves = await members.member.favorites.getFavorites(userId);
  if (faves.length === 0) {
    return <NoFavorites />;
  }

  const memberId = faves[0].memberId;

  return (
    <>
      <div>
        <h1 className="text-black text-xl font-normal">My Favorites</h1>
        <p className="text-base font-normal">
          View and manage brands that you have favorited. Favoriting brands will
          help keep you up to date with their new releases and more.
        </p>
      </div>
      <FavoritesGrid
        favorites={faves}
        removeMultipleFavorites={removeMultipleFavorites.bind(
          undefined,
          memberId
        )}
      />
    </>
  );
}

function NoFavorites() {
  return (
    <div className="flex flex-col justify-center">
      <div className="max-w-[500px] flex flex-col justify-center align-center text-center gap-6">
        <div className="flex justify-center items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden flex justify-center items-center bg-[#F4EBE6]">
            <FavoriteFilledIcon className="fill-[#823032] stroke-[#823032] w-[75%] h-[75%]" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-normal text-primary">
            My Favorite Brands
          </h1>
          <p>
            It doesn’t seem like you have favorited any brands! Add brands to
            your favorites to receive updates and surprises.
          </p>
        </div>
        <div className="flex flex-row justify-center">
          <PrimaryButton href={`/brands`}>View Brands</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
