import { Layout as LayoutComponent } from "@danklabs/cake/admin/brands";

export default function ({
  params,
  children,
}: {
  params: { slug: string };
  children: React.ReactNode;
}) {
  return <LayoutComponent slug={params.slug}>{children}</LayoutComponent>;
}
