import { getMemberCollectionReturnType } from "@danklabs/cake/services/admin-service";
import { Button, LeftArrow, RightArrow } from "@danklabs/pattern-library/core";
import { CollectionItem } from "./CollectionItem";
import { CakePresentIcon } from "@danklabs/cake/pattern-library/core";

export type CardGridProps = {
  memberFirstName: string | null;
  collection: getMemberCollectionReturnType;
};

export function CardGrid({ memberFirstName, collection }: CardGridProps) {
  if (collection.brandSlugs.length === 0) {
  } else if (collection.brandSlugs.length === 1) {
  } else if (collection.brandSlugs.length === 2) {
  }

  let cardWidth = "w-1/5";
  let infoWidth = "";
  let infoPanel: React.ReactNode = <></>;

  if (collection.brandSlugs.length === 0) {
    infoPanel = <Helper0 memberFirstName={memberFirstName} />;
    cardWidth += "w-1/3";
    infoWidth = "w-2/3";
  } else if (collection.brandSlugs.length === 1) {
    infoPanel = <Helper1 memberFirstName={memberFirstName} />;
    cardWidth += "w-1/3";
    infoWidth += "w-2/3";
  } else if (collection.brandSlugs.length === 2) {
    cardWidth = "w-1/3";
    infoWidth += " w-1/3";
    infoPanel = <Helper2 memberFirstName={memberFirstName} />;
  } else {
    cardWidth = "w-1/5";
    infoWidth = ""; // No helper text for more than 3 cards
  }

  return (
    <div className="grid md:flex md:flex-row md:gap-6">
      {collection.brandSlugs.map((slug, idx) => (
        <CollectionItem idx={idx} key={slug} item={collection.itemMap[slug]} />
      ))}
      {infoPanel}
    </div>
  );
}

function Helper0({ memberFirstName }: { memberFirstName: string | null }) {
  return (
    <InfoPanel>
      <div className="p-6 max-w-[525px] flex flex-col items-center gap-6 p-6 text-center">
        <CakePresentIcon className="h-[64px] w-[64px] fill-accent stroke-transparent" />
        <h1 className="uppercase font-bold text-[36px]">
          You’re ready to Design your collection.
        </h1>
        <p>
          You haven’t added any brands to your collection! Select up to ten
          brands to build out your collection and reap the rewards and benefits!
        </p>
        <Button>
          View The Brands <RightArrow className="fill-accent stroke-accent" />
        </Button>
      </div>
    </InfoPanel>
  );
}

function Helper1({ memberFirstName }: { memberFirstName: string | null }) {
  return (
    <InfoPanel>
      <div className="max-w-[350px] flex flex-col gap-6 border-l-[5px] border-accent p-6">
        <h1 className="uppercase font-bold text-[36px]">
          {memberFirstName}, it only gets sweeter.
        </h1>
        <p>
          Picking just one of anything can be a difficult decision, luckily you
          get to choose nine more brands to build out your collection!
        </p>
        <Button>View The Brands </Button>
      </div>
    </InfoPanel>
  );
}
function Helper2({ memberFirstName }: { memberFirstName: string | null }) {
  return (
    <InfoPanel>
      <div className="max-w-[350px] flex flex-col gap-6">
        <h1 className="uppercase font-bold text-[36px]">
          There must be more you knead?
        </h1>
        <p>
          Now your really starting to cook. The more brands in your collection,
          the more ingredients for cooking up your favorite looks!
        </p>
        <Button>View The Brands </Button>
      </div>
    </InfoPanel>
  );
}

function InfoPanel({ children }: { children?: React.ReactNode }) {
  return (
    <div className="h-[580px] w-full flex flex-col items-center justify-center bg-dark text-dark-content rounded-md">
      <div className="">{children}</div>
    </div>
  );
}
