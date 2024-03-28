import { BrandMembersPage } from "@danklabs/cake/admin";

export default function Page({ params }: { params: { slug: string } }) {
  return <BrandMembersPage slug={params.slug} />;
}
