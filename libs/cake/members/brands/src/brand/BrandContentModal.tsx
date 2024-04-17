import {
  CloseIcon,
  DrawerModal,
  GhostButton,
} from "@danklabs/pattern-library/core";
import { BrandContent } from "./BrandContent";

export async function BrandContentModal({ slug }: { slug: string }) {
  return (
    <DrawerModal returnHref="/brands">
      <div className="rounded-md lg:p-6">
        <div className="absolute w-full text-3xl md:mb-4 flex flex-row justify-end lg:static">
          <GhostButton icon={<CloseIcon />} href={"/brands"}></GhostButton>
        </div>
        <BrandContent slug={slug} />
      </div>
    </DrawerModal>
  );
}
