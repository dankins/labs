import { InterceptModal } from "@danklabs/pattern-library/core";
import { GridList } from "./GridList";
import { BrandContentModal } from "./brand/BrandContentModal";
import { AddToCollectionModal } from "./brand/AddToCollectionModal";

export async function BrandsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const perspective = searchParams?.perspective as string;
  const sort = searchParams?.sort;
  const brand = searchParams?.brand;
  const action = searchParams?.action;

  return (
    <>
      {brand && <BrandContentModal slug={brand as string} />}
      {action && brand && action === "add-to-collection" && (
        <AddToCollectionModal slug={brand as string} />
      )}
      <div className="p-2 md:p-6 flex flex-col items-center">
        <div className="container">
          <div>
            <div>
              <h1 className="text-xl capitalize font-bold">The Brands</h1>
              <p className="text-base font-normal leading-[150%]">
                Select up to ten brands to build your collection, collect cake
                cards, and access amazing benefits only available to our
                exclusive Cake members.
              </p>
            </div>
            <GridList perspective={perspective} />
          </div>
        </div>
      </div>
    </>
  );
}
