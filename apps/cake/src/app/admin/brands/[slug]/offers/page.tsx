import { BrandOffersPage } from "@danklabs/cake/admin/brands";

export default function Page({ params }: { params: { slug: string } }) {
  return <BrandOffersPage slug={params.slug} />;
}
