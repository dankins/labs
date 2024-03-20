import { InterceptModal } from "@danklabs/pattern-library/core";

export default function ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return <InterceptModal returnHref="/admin/brands">modelay</InterceptModal>;
}
