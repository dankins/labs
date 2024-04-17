import {
  BagIcon,
  SanityImageServer,
} from "@danklabs/cake/pattern-library/core";
import { Brand } from "@danklabs/cake/services/admin-service";
import {
  Heading4,
  SecondaryButton,
  Spinner,
} from "@danklabs/pattern-library/core";
import Link from "next/link";

export async function Products({ brand }: { brand: NonNullable<Brand> }) {
  if (!brand.cms?.products || brand.cms?.products.length === 0) {
    return <></>;
  }

  return (
    <>
      <div className="flex flex-row items-center">
        <Heading4 className="grow">
          Latest styles from {brand.cms.name}
        </Heading4>
        <SecondaryButton size="sm" icon={<BagIcon className="fill-dark" />}>
          <span className="hidden md:block">Visit Store</span>
        </SecondaryButton>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {brand.cms.products.map((product) => (
          <Item key={product.pdpLink} product={product} />
        ))}
      </div>
    </>
  );
}

function Item({
  product,
}: {
  product: NonNullable<NonNullable<Brand["cms"]>["products"]>[0];
}) {
  return (
    <div className="rounded-md overflow-hidden bg-[#111] w-full max-w-[300px] flex flex-col gap-2 items-center justify-center">
      <Link href={product.pdpLink} target="_blank">
        <SanityImageServer
          image={product.image}
          alt={product.name}
          height={387}
          width={290}
          aspectRatio="portrait"
        />
      </Link>
    </div>
  );
}

export function InstagramLoading() {
  return (
    <>
      <div></div>
      <Heading4>... on Instagram</Heading4>
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
