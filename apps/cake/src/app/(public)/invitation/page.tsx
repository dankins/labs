import { PageWithNavbar } from "@danklabs/pattern-library/core";
import {
  Foyer,
  generateMetadata as foyerGenerateMetadata,
} from "@danklabs/cake/foyer";
import { ClerkProvider } from "@clerk/nextjs";
import { PageView } from "@danklabs/cake/events";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const metadata = await foyerGenerateMetadata(
    (searchParams["code"] as string) || undefined
  );
  console.log("metadata", { searchParams, metadata });
  return metadata;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <ClerkProvider>
      <PageView tags={[]} />
      <PageWithNavbar>
        <div>
          <Foyer searchParams={searchParams} />
        </div>
      </PageWithNavbar>
    </ClerkProvider>
  );
}
