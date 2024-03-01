import { GridList } from "./GridList";

export async function BrandsPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="container">
        <div>
          <div>
            <h1 className="text-xl capitalize font-bold">The Brands</h1>
            <p className="text-base font-normal leading-[150%]">
              The Best Brands Jerry, the Best. Select up to ten brands to build
              your collection, collect cake cards, and access amazing benefits
              only available to our exclusive Cake members.
            </p>
          </div>
          <GridList />
        </div>
      </div>
    </div>
  );
}
