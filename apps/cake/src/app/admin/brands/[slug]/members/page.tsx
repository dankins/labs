import { BrandMembersPage } from "@danklabs/cake/admin/brands";

export default function Page({ params }: { params: { slug: string } }) {
  return <BrandMembersPage slug={params.slug} />;
}
