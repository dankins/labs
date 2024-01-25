import { getBrands } from "@danklabs/cake/cms";
import { Suspense } from "react";
import { SanityImage } from "../../../pattern-library/core/src/images/SanityImage";
import { LogoSpace } from "@danklabs/cake/pattern-library/core";
import Link from "next/link";
import { getMemberByIAM } from "@danklabs/cake/services/admin-service";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

type Brand = Awaited<ReturnType<typeof getBrands>>["brands"][0];
type Pass = NonNullable<
  Awaited<ReturnType<typeof getMemberByIAM>>
>["passport"]["passes"][0];

type PassMap = { [slug: string]: Pass };

export async function GridList() {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
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
    <div className="grid grid-cols-2 md:grid-cols-4">
      {blurHashes.map((blurHash) => (
        <div className="w-full aspect-[2/3] relative group ">
          <figure className="absolute top-0 w-full h-full">
            <Image src={blurHash} fill alt="placeholder" />
          </figure>
        </div>
      ))}
    </div>
  );
}

export async function Component() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("userid not available");
  }

  const [brands, passes] = await Promise.all([
    getBrands(),
    getMemberByIAM(userId, { passport: true }).then((member) =>
      member?.passport.passes.reduce((acc, cur) => {
        acc[cur.brand.slug] = cur;
        return acc;
      }, {} as PassMap)
    ),
  ]);

  if (!passes) {
    return <div>error loading brands: invalid member id</div>;
  }

  return (
    <div>
      <BrandGrid brands={brands.brands} passes={passes} />
    </div>
  );
}

function BrandGrid({ brands, passes }: { brands: Brand[]; passes: PassMap }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4">
      {brands.map((b) => (
        <GridItem brand={b} pass={passes[b.slug]} />
      ))}
    </div>
  );
}

function GridItem({ brand, pass }: { brand: Brand; pass?: Pass }) {
  return (
    <Link href={`/brands/${brand.slug}`}>
      <div className="w-full aspect-[2/3] relative group">
        <figure className="absolute top-0 w-full h-full">
          {brand.passBackground && (
            <SanityImage
              alt={`${brand.name} Logo`}
              image={brand.passBackground}
              height={0}
              width={0}
              style={{ height: "100%", width: "100%" }}
            />
          )}
        </figure>
        <div className="w-full h-full absolute top-0 margin-top-auto bg-black/50 group-hover:bg-transparent"></div>
        <div className="absolute top-0 w-full h-full p-4">
          <LogoSpace>
            {brand.passLogo ? (
              <SanityImage
                alt={`${brand.name} Logo`}
                image={brand.passLogo}
                height={0}
                width={0}
                style={{ height: "2.5rem", width: "auto" }}
              />
            ) : (
              <h1 className="text-white text-5xl">{brand.name}</h1>
            )}
          </LogoSpace>
        </div>
        <div className="absolute top-0 w-full h-full p-4 flex flex-col items-end justify-end">
          {pass && (
            <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-blue-700 bg-blue-100 border border-blue-300">
              <div className="text-xs font-normal leading-none max-w-full flex-initial">
                Member
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
