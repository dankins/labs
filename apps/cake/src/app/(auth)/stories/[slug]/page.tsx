import { StoryDetailPage } from "@danklabs/cake/members/content";
export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return <StoryDetailPage slug={params.slug} />;
}
