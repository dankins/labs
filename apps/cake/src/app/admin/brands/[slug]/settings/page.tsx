import { BrandSettings } from "@danklabs/cake/admin/brands";

export default function Page({ params }: { params: { slug: string } }) {
  return <BrandSettings slug={params.slug} />;
}
