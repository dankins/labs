import { CollectionItemInterceptModal } from "@danklabs/cake/members/dashboard";
import { BottomSheet, InterceptModal } from "@danklabs/pattern-library/core";

export default function ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return <CollectionItemInterceptModal slug={params.slug} />;
}
