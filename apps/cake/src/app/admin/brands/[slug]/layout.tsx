import { AdminBrandLayout } from "@danklabs/cake/admin";

export default function ({
  params,
  children,
}: {
  params: { slug: string };
  children: React.ReactNode;
}) {
  return <AdminBrandLayout slug={params.slug}>{children}</AdminBrandLayout>;
}
