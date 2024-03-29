import Link from "next/link";
import { Nav } from "./Nav";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import {
  cachedGetBrandAdminOptions,
  cachedGetBrandsBySlug,
} from "@danklabs/cake/services/admin-service";
import { SanityImageServer } from "@danklabs/cake/pattern-library/core";
import Image from "next/image";

export function NavPanel({ slug }: { slug: string }) {
  return (
    <nav className="flex flex-col bg-white min-h-screen min-w-[275px] shadow-md">
      <div className="h-[64px] bg-black/80">
        <Link
          href="/brand-admin"
          className="p-4 flex flex-row items-center gap-2 text-white"
        >
          <Image
            alt="Cake Logo"
            src="/images/logo.svg"
            className="w-[66px] h-[19px] invert"
            height={100}
            width={100}
          />
          <span className="text-xs">manager</span>
          <span className="grow" />
          <UserButton afterSignOutUrl={"/"} />
        </Link>
      </div>
      <BrandSwitcher currentBrand={slug} />
      <div className="grow flex flex-col">
        <Nav slug={slug} />
      </div>
      <div className="p-4"></div>
    </nav>
  );
}

export async function BrandSwitcher({
  currentBrand,
}: {
  currentBrand: string;
}) {
  return (
    <Suspense>
      <BrandSwitcherComponent />
    </Suspense>
  );
}

function BrandSwitcherLoading() {
  return;
}

async function BrandSwitcherComponent() {
  const { userId } = auth();
  const orgs = await cachedGetBrandAdminOptions(userId!);
  const brands = await cachedGetBrandsBySlug(orgs);
  return (
    <div className="h-[64px] w-full flex flex-row items-center invert p-3">
      {Object.keys(brands).map((brandSlug) => (
        <SanityImageServer
          key={brandSlug}
          alt={`${brands[brandSlug].cms?.name} Logo`}
          image={brands[brandSlug].cms?.passLogo!}
          width={257}
          height={48}
          style={{ height: "48px", width: "auto" }}
        />
      ))}
    </div>
  );
}
