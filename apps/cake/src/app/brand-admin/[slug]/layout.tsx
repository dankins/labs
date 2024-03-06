import { PageWithNavbar } from "@danklabs/pattern-library/core";
import { SectionLayout } from "@danklabs/cake/brand-admin";
import { ClerkProvider } from "@clerk/nextjs";

export default function Layout({
  params,
  children,
}: {
  params: { slug: string };
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <SectionLayout slug={params.slug}>{children}</SectionLayout>
    </ClerkProvider>
  );
}
