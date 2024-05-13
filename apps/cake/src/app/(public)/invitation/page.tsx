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
  const metadata = await foyerGenerateMetadata(searchParams?.i as string);
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
      <Foyer searchParams={searchParams} />
    </ClerkProvider>
  );
}
