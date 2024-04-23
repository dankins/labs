import {
  CloseIcon,
  DrawerModal,
  GhostButton,
} from "@danklabs/pattern-library/core";
import { BrandContent } from "./BrandContent";

export async function BrandContentModal({ slug }: { slug: string }) {
  return (
    <DrawerModal
      returnHref="/brands"
      className="darkSection bg-neutral text-neutral-content md:lightSection"
    >
      <div className="rounded-md h-full">
        <div className="absolute top-0 left-0 z-40 w-full text-3xl md:mb-4 flex flex-row justify-end lg:static">
          <GhostButton icon={<CloseIcon />} href={"/brands"}></GhostButton>
        </div>
        <BrandContent slug={slug} />
      </div>
    </DrawerModal>
  );
}
