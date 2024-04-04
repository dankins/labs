import { SectionHeading } from "@danklabs/cake/pattern-library/core";
import { Brand } from "@danklabs/cake/services/admin-service";
import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";

export function Instagram({ brand }: { brand: NonNullable<Brand["cms"]> }) {
  return (
    <>
      <SectionHeading>{brand.name} on Instagram</SectionHeading>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </>
  );
}

function Item() {
  return (
    <div className="p-4 rounded-md bg-[#111] w-full aspect-[1/1] max-w-[300px] flex flex-col gap-4 items-center justify-center">
      <div className="uppercase text-sm">content</div>
    </div>
  );
}

export function InstagramLoading() {
  return (
    <>
      <SectionHeading>... on Instagram</SectionHeading>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <ItemLoading />
        <ItemLoading />
        <ItemLoading />
      </div>
    </>
  );
}

function ItemLoading() {
  return (
    <div className="p-4 rounded-md bg-[#111] w-full aspect-[1/1] max-w-[300px] flex flex-col gap-4 items-center justify-center">
      <Spinner />
    </div>
  );
}
