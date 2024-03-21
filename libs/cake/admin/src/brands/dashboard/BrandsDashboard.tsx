import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { TypeFromSelection } from "groqd";
import { sanityImageUrlBuilder } from "@danklabs/integrations/sanitycms";
import {
  AdminPageHeader,
  Badge,
  ExternalLinkIcon,
  Paragraph3,
  PrimaryButton,
} from "@danklabs/pattern-library/core";
import {
  CakeBrand,
  cachedGetBrands,
} from "@danklabs/cake/services/admin-service";

export function BrandsDashboard() {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
}

function Loading() {
  return <div>loading</div>;
}

async function Component() {
  const data = await cachedGetBrands("admin");

  return (
    <>
      <AdminPageHeader>
        <h1 className="text-3xl grow">All Brands</h1>

        <PrimaryButton
          className="self-align-end"
          href={`/admin/brands?action=add`}
        >
          Add Brand
        </PrimaryButton>
      </AdminPageHeader>
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12 w-full">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg ">
          <TableBody brands={data} />
        </div>
      </div>
      <div className="my-10"></div>
    </>
  );
}

export type TableBodyProps = {
  brands: CakeBrand[];
};

async function TableBody({ brands }: TableBodyProps) {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-4 py-3">
            Brand
          </th>
        </tr>
      </thead>
      <tbody>
        {brands.map((b) => (
          <BrandRow key={b.slug} brand={b} />
        ))}
      </tbody>
    </table>
  );
}

type BrandRowProps = {
  brand: CakeBrand;
};
function BrandRow({ brand }: BrandRowProps) {
  const cmsUrl =
    process.env[`NEXT_PUBLIC_SITE_URL`]! +
    `/studio/structure/brand;${brand.cmsId}`;
  const logoUrl = brand.logoSquare
    ? sanityImageUrlBuilder.image(brand.logoSquare).width(200).url()
    : "/images/missing-brand-logo.png";
  return (
    <tr className="group border-b dark:border-gray-600 hover:bg-gray-100">
      <th
        scope="row"
        className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-row"
      >
        <Link
          href={`/admin/brands/${brand.slug}`}
          className="grow flex flex-row items-center"
        >
          <Image
            src={logoUrl}
            alt={`Logo for ${brand.name}`}
            width={64}
            height={64}
            className="w-auto h-14 w-14 mr-3"
          />
          <Paragraph3>{brand.name || brand.slug}</Paragraph3>
        </Link>
        <div className="hidden group-hover:block">
          {brand.cmsId && (
            <PrimaryButton
              href={cmsUrl}
              icon={<ExternalLinkIcon />}
              iconPosition="right"
            >
              View in CMS
            </PrimaryButton>
          )}
        </div>
        <div className="w-16 ml-4 flex justify-center">
          <Badge>{brand.status}</Badge>
        </div>
      </th>
    </tr>
  );
}
