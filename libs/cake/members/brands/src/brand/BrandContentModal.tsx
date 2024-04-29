import {
  CircleButton,
  CloseIcon,
  DrawerModal,
  FavoriteFilledIcon,
  FavoriteOutlineIcon,
  FormAction,
  GhostButton,
} from "@danklabs/pattern-library/core";
import { BrandContent } from "./BrandContent";
import { Suspense } from "react";
import { members } from "@danklabs/cake/services/admin-service";
import { auth } from "@clerk/nextjs/server";
import { addFavoriteAction, removeFavoriteAction } from "./actions";
import { IconLoading } from "./IconLoading";

export async function BrandContentModal({ slug }: { slug: string }) {
  return (
    <DrawerModal
      returnHref="/brands"
      className="darkSection bg-neutral text-neutral-content md:lightSection"
    >
      <div className="rounded-md h-full">
        <div className="absolute top-0 left-0 p-4 z-40 w-full text-3xl md:mb-4 flex flex-row justify-end gap-2 lg:static">
          <ToggleFavoriteButton slug={slug} />
          <CircleButton
            size="lg"
            icon={<CloseIcon />}
            href={"/brands"}
            background="black/50"
            className="bg-black/50 text-white"
          ></CircleButton>
        </div>
        <BrandContent slug={slug} />
      </div>
    </DrawerModal>
  );
}

function ToggleFavoriteButton({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<></>}>
      <ToggleFavoriteButtonLoaded slug={slug} />
    </Suspense>
  );
}

export async function ToggleFavoriteButtonLoaded({ slug }: { slug: string }) {
  const { userId: iam } = auth().protect();
  const member = await members.member.get(iam);
  const isFavorite = member.favorites.includes(slug);

  if (isFavorite) {
    return (
      <form
        key="remove-favorite"
        action={removeFavoriteAction.bind(undefined, slug)}
      >
        <CircleButton
          size="lg"
          icon={
            <IconLoading>
              <FavoriteFilledIcon />
            </IconLoading>
          }
          type="submit"
          background="black/50"
          className="bg-black/50 text-white"
        ></CircleButton>
      </form>
    );
  }

  return (
    <form key="add-favorite" action={addFavoriteAction.bind(undefined, slug)}>
      <CircleButton
        size="lg"
        icon={
          <IconLoading>
            <FavoriteOutlineIcon />
          </IconLoading>
        }
        type="submit"
        background="black/50"
        className="bg-black/50 text-white"
      ></CircleButton>
    </form>
  );
}
