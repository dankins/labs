import Link from "next/link";
import { Tabs } from "./Tabs";
import { Suspense } from "react";
import { admin, brands } from "@danklabs/cake/services/admin-service";
import { SanityImageServer } from "@danklabs/cake/pattern-library/core";
import { AdminPageHeader, Heading1 } from "@danklabs/pattern-library/core";

export function AdminBrandLayout({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <LogoSection slug={slug} />
      <div className="mx-4">
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}

async function LogoSection({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<AdminPageHeader />}>
      <LogoSectionLoaded slug={slug} />
    </Suspense>
  );
}
async function LogoSectionLoaded({ slug }: { slug: string }) {
  const brand = await brands.getBrand(slug);

  return (
    <AdminPageHeader>
      {brand.cms.passLogo ? (
        <SanityImageServer
          alt="Brand Logo"
          className="my-2"
          image={brand.cms.passLogo!}
          width={200}
          height={100}
          style={{ height: "100%", width: "auto" }}
        />
      ) : (
        <Heading1 className="text-xl">
          {brand.cms.name || brand.db.slug}
        </Heading1>
      )}
    </AdminPageHeader>
  );
}
