import { Suspense } from "react";
import { brandListSelection, getBrands } from "../cms/queries/getBrands";
import Link from "next/link";
import Image from "next/image";
import { TypeFromSelection } from "groqd";
import { sanityImageUrlBuilder } from "@danklabs/integrations/sanitycms";

export function BrandList() {
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
  const data = await getBrands();
  console.log({ data });

  return (
    <div className="px-4 mx-auto max-w-screen-2xl lg:px-12 w-full">
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg ">
        <TableHeader brandCount={data.brandCount as number} />
        <TableBody brands={data.brands} />
        <div className="mt-10"></div>
      </div>
    </div>
  );
}

async function TableHeader({ brandCount }: { brandCount: number }) {
  return (
    <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
      <div className="flex items-center flex-1 space-x-4 gap-2">
        <h5>
          <span className="text-gray-500">All Brands:&nbsp;</span>
          <span className="dark:text-white">{brandCount}</span>
        </h5>
        {/* <h5>
          <span className="text-gray-500">Total sales:</span>
          <span className="dark:text-white">$88.4k</span>
        </h5> */}
      </div>
      <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
        {/* <button
          type="button"
          className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <svg
            className="w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Update stocks 1/250
        </button> */}
        {/* <button
          type="button"
          className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <svg
            className="w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          New Brand
        </button> */}
      </div>
    </div>
  );
}

type BrandListSelectionProps = TypeFromSelection<typeof brandListSelection>;
export type TableBodyProps = {
  brands: BrandListSelectionProps[];
};

async function TableBody({ brands }: TableBodyProps) {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {/* <th scope="col" className="p-4">
            <div className="flex items-center">
              <input
                id="checkbox-all"
                type="checkbox"
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="checkbox-all" className="sr-only">
                checkbox
              </label>
            </div>
          </th> */}
          <th scope="col" className="px-4 py-3">
            Brand
          </th>
          {/* <th scope="col" className="px-4 py-3">
            Category
          </th>
          <th scope="col" className="px-4 py-3">
            Stock
          </th>
          <th scope="col" className="px-4 py-3">
            Sales/Day
          </th>
          <th scope="col" className="px-4 py-3">
            Sales/Month
          </th>
          <th scope="col" className="px-4 py-3">
            Rating
          </th>
          <th scope="col" className="px-4 py-3">
            Sales
          </th>
          <th scope="col" className="px-4 py-3">
            Revenue
          </th>
          <th scope="col" className="px-4 py-3">
            Last Update
          </th> */}
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
  brand: BrandListSelectionProps;
};
function BrandRow({ brand }: BrandRowProps) {
  console.log({ brand });

  const logoUrl = brand.logoSquare
    ? sanityImageUrlBuilder.image(brand.logoSquare).width(200).url()
    : "/images/missing-brand-logo.webp";
  return (
    <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
      {/* <td className="w-4 px-4 py-3">
        <div className="flex items-center">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="checkbox-table-search-1" className="sr-only">
            checkbox
          </label>
        </div>
      </td> */}
      <th
        scope="row"
        className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-row"
      >
        <Link href={`/admin/brands/${brand.slug}`}>
          <Image
            src={logoUrl}
            alt={`Logo for ${brand.name}`}
            width={64}
            height={64}
            className="w-auto h-14 w-14 mr-3"
          />
        </Link>

        <Link href={`/admin/brands/${brand.slug}`} className="grow">
          {brand.name}
        </Link>
      </th>
      {/* <td className="px-4 py-2">
        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
          Desktop PC
        </span>
      </td>
      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div className="flex items-center">
          <div className="inline-block w-4 h-4 mr-2 bg-red-700 rounded-full"></div>
          95
        </div>
      </td>
      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        1.47
      </td>
      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        0.47
      </td>
      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div className="flex items-center">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="ml-1 text-gray-500 dark:text-gray-400">5.0</span>
        </div>
      </td>
      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 mr-2 text-gray-400"
            aria-hidden="true"
          >
            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
          </svg>
          1.6M
        </div>
      </td>
      <td className="px-4 py-2">$3.2M</td>
      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        Just now
      </td> */}
    </tr>
  );
}
