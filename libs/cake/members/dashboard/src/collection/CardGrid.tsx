import { RightArrow } from "@danklabs/pattern-library/core";
import { CollectionItem } from "./CollectionItem";
import { CakePresentIcon } from "@danklabs/cake/pattern-library/core";
import Link from "next/link";
import { Member, brands } from "@danklabs/cake/services/admin-service";
import classNames from "classnames";

export type CardGridProps = {
  member: Member;
  memberBrands: Awaited<ReturnType<typeof brands.getBrandsBySlug>>;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export function CardGrid({
  member,
  memberBrands,
  searchParams,
}: CardGridProps) {
  const collection = member.collection;
  if (collection.brandSlugs.length === 0) {
    return <Helper0 memberFirstName={member.firstName} />;
  }

  let cardWidth = "w-1/5";
  let infoWidth = "";
  let infoPanel: React.ReactNode = <></>;

  const selectedItem = searchParams?.["collectionItem"];

  if (collection.brandSlugs.length === 0) {
    infoPanel = <Helper0 memberFirstName={member.firstName} />;
    cardWidth += "w-1/3";
    infoWidth = "w-2/3";
  } else {
    cardWidth = "w-1/5";
    infoWidth = ""; // No helper text for more than 3 cards
  }

  return (
    <div
      className={classNames(
        "grid grid-cols-1 grid-rows-1 md:grid-cols-2 lg:grid-cols-3 items-start md:gap-4",
        selectedItem ? "md:grid-cols-1 md:grid-rows-1" : undefined
      )}
    >
      {collection.brandSlugs.map((slug, idx) => (
        <CollectionItem
          idx={idx}
          key={slug}
          member={member}
          brand={memberBrands[slug]!}
          item={collection.itemMap[slug]}
          isActive={slug === selectedItem}
          isOtherActive={!!selectedItem && slug !== selectedItem}
        />
      ))}
      {/* {infoPanel} */}
    </div>
  );
}

function Helper0({ memberFirstName }: { memberFirstName: string | null }) {
  return (
    <InfoPanel>
      <div className="p-6 h-[480px] max-w-[525px] flex flex-col items-center gap-6 p-6 text-center">
        <CakePresentIcon className="h-[64px] w-[64px] fill-accent stroke-transparent" />
        <h1 className="uppercase font-bold text-[36px]">
          You’re ready to Design your collection.
        </h1>
        <p>
          You haven’t added any brands to your collection! Select up to ten
          brands to build out your collection and reap the rewards and benefits!
        </p>
        <Link
          href="/brands"
          className="flex flex-row p-3 items-center gap-2 bg-dark uppercase text-xs text-dark-content border border-dark-content"
        >
          <span className="grow uppercase">View the Brands</span>
          <RightArrow className="stroke-accent" />
        </Link>
      </div>
    </InfoPanel>
  );
}

function InfoPanel({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-dark text-dark-content rounded-md">
      <div className="">{children}</div>
    </div>
  );
}
