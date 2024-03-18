import { MembersPage } from "@danklabs/cake/brand-admin";

export default function Page({ params }: { params: { slug: string } }) {
  return <MembersPage slug={params.slug} />;
}
