import { members } from "@danklabs/cake/services/admin-service";
import { Suspense } from "react";
import { ContentGrid } from "./ContentGrid";

export async function StoriesGrid() {
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
  const contentList = await members.content.getContentList();

  return <ContentGrid contentList={contentList.content} />;
}
