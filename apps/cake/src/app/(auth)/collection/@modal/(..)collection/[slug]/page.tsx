import { CollectionItemInterceptModal } from "@danklabs/cake/members/dashboard";

export default function ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return <CollectionItemInterceptModal slug={params.slug} />;
}
