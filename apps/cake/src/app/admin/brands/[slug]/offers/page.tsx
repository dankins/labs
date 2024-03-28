import { OffersPage } from "@danklabs/cake/admin";

export default function Page({ params }: { params: { slug: string } }) {
  return <OffersPage slug={params.slug} />;
}
