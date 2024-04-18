import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

import {
  CollectionIcon,
  PrimaryButton,
  SecondaryButton,
  SortIcon,
} from "@danklabs/pattern-library/core";

import {
  MemberCollection,
  MemberCollectionItem,
  members,
  brands,
  Brand,
} from "@danklabs/cake/services/admin-service";
import {
  LogoSpace,
  SanityImageServer,
} from "@danklabs/cake/pattern-library/core";

export async function GridList({ perspective }: { perspective?: string }) {
  return (
    <Suspense fallback={<Loading />}>
      <Component perspective={perspective} />
    </Suspense>
  );
}

export async function Loading() {
  const blurHashes = [
    "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='none' style='filter: url(%23b);' href='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAdABQDASIAAhEBAxEB/8QAGgAAAQUBAAAAAAAAAAAAAAAAAAIDBAUGB//EACYQAAIBAwMDBAMAAAAAAAAAAAECAwAEEQUhMRITIgYyQVEUYcH/xAAYAQADAQEAAAAAAAAAAAAAAAABAgUAA//EABwRAAMAAgMBAAAAAAAAAAAAAAABAhESITFRA//aAAwDAQACEQMRAD8A5ldTM7hJWVZJMduM7nFZO/sjFrUrQAKiyZAOxqw1GVpTFIzsOwvgc7mlnSdQ1SJJ8gMw95+BS/RqVlMeJdPk0d5+JE8YljQuyBvb90VLitbaS3hF23dmRAjMPnFFZRlHN3h9lfc+noJoow1wV3yCR/Kfj06OCIILyRgOQGwKeinaSHrffbiojNn9AjOKnO6fDKahLoldTx+MbIFH2MmiquaZ+vk8UUdq9DpPh//Z'/%3E%3C/svg%3E",
    "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='none' style='filter: url(%23b);' href='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAeABQDASIAAhEBAxEB/8QAGgAAAQUBAAAAAAAAAAAAAAAAAAMEBQcIBv/EACcQAAIBAwIGAQUAAAAAAAAAAAECAwAEEQUSBgcTISIxIyQ0QWFx/8QAGAEAAgMAAAAAAAAAAAAAAAAAAgQAAQP/xAAgEQACAQMEAwAAAAAAAAAAAAABAgADBCERFFFSFTFB/9oADAMBAAIRAxEAPwCxOat0I9EtQ7/RtL8oUjyGO39FVzyz4kv3L9HUelZW85C2rKArLn0KgtculudMMEcs5jd8gsx8FHYAVxUMT6frcFvBPKI3YMO/s0szEsW9RqmqhQhzNa3HE+mQOFlulRyoO3HrNFZsuurLcSSS3kiyMckBqKhun+aSxYLpkmI3d6skcSAbd2DioZgX12BmV3lVhgL6ApTXMwzhlJ2rhVFOeEJSvFeklvLdLg5/NGih8czJmNPPEmZxl/sXc497TRWgjZRN3CIP0FFFHsF7QPJN1n//2Q=='/%3E%3C/svg%3E",
    "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='none' style='filter: url(%23b);' href='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAOABQDASIAAhEBAxEB/8QAGgAAAQUBAAAAAAAAAAAAAAAAAAECAwQFB//EACQQAAEDBAEDBQAAAAAAAAAAAAECAwQABRESBgcxMhMhQVGR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgX/xAAcEQACAgIDAAAAAAAAAAAAAAABEQADAiEEEjL/2gAMAwEAAhEDEQA/AOicl6gWu9JjJEJ5xGfFQ75p3DuTM2WI4zBtiwpZUtbefADt+1PeOCWy2Q9ovqpWcjbbsKWxWJhTpUtS9lthJUD7kD7qc8hnv1KaqOGn1lW78venyUvGEG1aAFO+cGitSXw+EXtg88MjPxRRNdxLjFnHAQBn/9k='/%3E%3C/svg%3E",
    "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='none' style='filter: url(%23b);' href='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAeABQDASIAAhEBAxEB/8QAGQAAAwADAAAAAAAAAAAAAAAAAAQFAQYH/8QAIxAAAgEDBQACAwAAAAAAAAAAAQIDAAQRBRITIUEicSZhkf/EABYBAQEBAAAAAAAAAAAAAAAAAAIEAf/EABgRAQEBAQEAAAAAAAAAAAAAAAEAESEx/9oADAMBAAIRAxEAPwCzp+k6fBBLJHGgZM4Jp2wtxJawi5aNbl1J4x0f5UbTjzXjozHjZx1n91mzT8/aWbkEK9bQc4Ph+qkFWrw8nZ9LHIeqK2ye1VpWIIxRW6RxuYXMOpW4d44wwb1fKq6C9zBdTyzbmNwoYd5xjyqVtc8ShCu77puEIkWxEChiT0KI8SaajEuoXO747QMe0UjNcRGRt0RJHWc0UZYX/9k='/%3E%3C/svg%3E",
    "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='none' style='filter: url(%23b);' href='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAdABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAYHBAX/xAAmEAACAQMCBQUBAAAAAAAAAAABAgMABBEGEgUHEyFBFSIxYXEl/8QAFgEBAQEAAAAAAAAAAAAAAAAAAwQB/8QAGhEBAAIDAQAAAAAAAAAAAAAAAQACAxEhEv/aAAwDAQACEQMRAD8AqkCx3PA7Wb5De01HuZnAR69wudlI2ylT27YqkaVmN5oWVYywaJ85PgUj8wVmt7O7vp5JHiMWIwx8mtvbhFx03uZrXT6XcXWOMMe35RXX5biJNI2fX6rSHJJ+aKeuMSTuXsbLKAw8CihhAO9gu1TjcfulDnEt16Olq6xpDHECQvk5p803GHtkdznpHCjwPulfnM38CPsPfMin8zQlerGbvkCZdN7LfglnELGU4jGTvAycUVz2uCAqquAqgfP1RVIak3J//9k='/%3E%3C/svg%3E",
    "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='none' style='filter: url(%23b);' href='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAeABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUBBAcG/8QAJxAAAgEEAgECBwEAAAAAAAAAAQMCAAQFERIxIRNhBgcUIjJCUcH/xAAXAQADAQAAAAAAAAAAAAAAAAABAgUA/8QAGhEBAAIDAQAAAAAAAAAAAAAAAQARAgMSIf/aAAwDAQACEQMRAD8AdY214tC1Cfq+1OLn6hMIbhMR6JNUbrIyxPw3cXkVmNzJZZKI7G/AArKMV8ycvjcxBeQWWRbOI46J8E9aqPhpciyVM95i0zX/AFW6/An33RTl707gVWq4wMBIA9+Ruig668uMbL9qcOcicnYTQ5kUMA4R5R+2UT/tUchhMRcXuOvLlq1tsx5VDUpOI666qcZacRJb2F0h+0hUXtvBBk5Kl7gNHdEQYldR8cu559ThxEuo/wAFFK07YuMgSNjrdFboY3KT/9k='/%3E%3C/svg%3E",
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-5">
      {blurHashes.map((blurHash) => (
        <div key={blurHash} className="w-full aspect-[2/3] relative group ">
          <figure className="absolute top-0 w-full h-full">
            <Image src={blurHash} fill alt="placeholder" />
          </figure>
        </div>
      ))}
    </div>
  );
}

export async function Component({ perspective }: { perspective?: string }) {
  let validatedSort: Parameters<typeof brands.getBrands>[1] = "asc";

  const { userId } = auth().protect();

  const member = await members.member.get(userId);
  let validatedPerspective = "member";
  if (perspective === "brand-manager" && member.isBrandManager) {
    validatedPerspective = "brand-manager";
  } else if (perspective === "admin" && member.isSuperAdmin) {
    validatedPerspective = "admin";
  }

  const brandsResult = await brands.getBrands(
    validatedPerspective,
    validatedSort
  );

  if (!brandsResult) {
    return <div>error loading brands</div>;
  }

  return (
    <div>
      <BrandGrid brands={brandsResult} collection={member.collection} />
    </div>
  );
}

function BrandGrid({
  brands,
  collection,
}: {
  brands: Brand[];
  collection: MemberCollection;
}) {
  return (
    <>
      <div className="my-5 flex flex-row items-center">
        <div className="grow">
          <span>
            <CollectionIcon /> {collection.count} /{" "}
            {collection.maxCollectionItems}
          </span>{" "}
          in Collections
        </div>
        <div>
          <SecondaryButton icon={<SortIcon />} />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 md:gap-4">
        {brands.map((b) => (
          <GridItem
            key={b.db.id}
            brand={b.cms!}
            pass={collection.itemMap[b.db.slug]}
          />
        ))}
      </div>
    </>
  );
}

function GridItem({
  brand,
  pass,
}: {
  brand: NonNullable<Brand["cms"]>;
  pass?: MemberCollectionItem;
}) {
  const isFeatured = brand.featured === "featured";
  let linkClass: string | undefined = undefined;

  let cardClass = "w-full aspect-[215/260] relative group";
  if (isFeatured) {
    linkClass = "col-span-2";
    cardClass = "w-full aspect-[447/260] relative group";
  }
  return (
    <Link
      className={linkClass + " group hover:drop-shadow-xl"}
      href={`?brand=${brand.slug}`}
    >
      <div className={cardClass}>
        <figure className="absolute top-0 w-full h-full ">
          {brand.passBackground && (
            <SanityImageServer
              alt={`${brand.name} Logo`}
              image={brand.passBackground}
              height={520}
              width={isFeatured ? 894 : 430}
              style={{ height: "100%", width: "100%" }}
              aspectRatio={isFeatured ? "landscape" : "portrait"}
              className="group-hover:scale-[102%]  transition-transform duration-300 ease-in-out"
            />
          )}
        </figure>
        <div className="w-full h-full absolute top-0 margin-top-auto bg-black/25 group-hover:bg-transparent group-hover:scale-[102%] transition-transform duration-300 ease-in-out"></div>
        <div className="absolute top-0 w-full h-full p-4">
          <LogoSpace>
            {brand.passLogo ? (
              <SanityImageServer
                alt={`${brand.name} Logo`}
                image={brand.passLogo}
                height={250}
                width={250}
                style={{ height: "2.5rem", width: "auto" }}
                className="invert"
              />
            ) : (
              <h1 className="text-white text-5xl">
                {brand.name || brand.slug}
              </h1>
            )}
          </LogoSpace>
        </div>
        <div className="absolute top-0 w-full h-full p-4 flex flex-col items-end justify-end">
          {pass && (
            <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-black/30 rounded-full">
              <div className="text-xs text-white font-normal leading-none max-w-full flex-initial">
                In My Collection
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
