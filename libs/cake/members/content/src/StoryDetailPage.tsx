import { getContent } from "@danklabs/cake/cms";
import { Suspense } from "react";
import { RenderContent } from "./RenderContent";

export async function StoryDetailPage({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<Loading />}>
      <Component slug={slug} />
    </Suspense>
  );
}

function Loading() {
  return <div>Loading...</div>;
}

async function Component({ slug }: { slug: string }) {
  console.log("getting content", slug);
  const content = await getContent(slug);

  return (
    <div className="flex flex-col items-center">
      <div className="prose">
        <h1 className="text-3xl">{content.title}</h1>
        <RenderContent blocks={content.content} />
      </div>
    </div>
  );
}
