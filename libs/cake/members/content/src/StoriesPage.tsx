import { getContentList } from "@danklabs/cake/cms";
import { Suspense } from "react";
import { ContentGrid } from "./ContentGrid";

export async function StoriesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
}

function Loading() {
  return <div>Loading...</div>;
}

async function Component() {
  const contentList = await getContentList();

  return <ContentGrid contentList={contentList.content} />;
}
