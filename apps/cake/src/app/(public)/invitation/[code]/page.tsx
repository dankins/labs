import type { Metadata, ResolvingMetadata } from "next";

import { Heading1, PageWithNavbar } from "@danklabs/pattern-library/core";
import { Foyer } from "@danklabs/cake/foyer";
import { ClerkProvider } from "@clerk/nextjs";
import { PageView } from "@danklabs/cake/events";
import { invitations } from "@danklabs/cake/services/admin-service";

type Props = {
  params: { code: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const invite = await invitations.getByCode.cached(params.code);

  // fetch data
  const product = await fetch(`https://.../${id}`).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.title,
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { code: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const invite = await invitations.getByCode.cached(params.code);
  if (!invite) {
    return (
      <div>
        <Heading1>not found</Heading1>
      </div>
    );
  }

  return (
    <div>
      <Heading1>{invite?.code}</Heading1>
    </div>
  );
}
