import Link from "next/link";
import { Tabs } from "./Tabs";
import { Suspense } from "react";
import { getBrandAdminData } from "@danklabs/cake/services/admin-service";
import { SanityImageServer } from "@danklabs/cake/pattern-library/core";
import { AdminPageHeader } from "@danklabs/pattern-library/core";

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
  const brand = await getBrandAdminData(slug);

  return (
    <AdminPageHeader>
      <SanityImageServer
        alt="Brand Logo"
        className="my-2 invert"
        image={brand.cmsData.passLogo!}
        width={200}
        height={100}
        style={{ height: "100%", width: "auto" }}
      />
    </AdminPageHeader>
  );
}
