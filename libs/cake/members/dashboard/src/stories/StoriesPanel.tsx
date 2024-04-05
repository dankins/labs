import { auth } from "@clerk/nextjs/server";
import { SanityImageServer } from "@danklabs/cake/pattern-library/core";
import { getStoriesForMember } from "@danklabs/cake/services/admin-service";
import { RightArrow } from "@danklabs/pattern-library/core";
import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";
import Link from "next/link";
import { Suspense } from "react";

export async function StoriesPanel() {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
}

function Loading() {
  return <Spinner />;
}

async function Component() {
  const { userId } = auth().protect();
  const stories = await getStoriesForMember(userId);
  return (
    <div className="w-full">
      <div className="flex flex-row items-center font-bold text-[32px]">
        <h1 className="grow uppercase font-bold text-[20px] md:text-[32px]">
          Updates
        </h1>
        <RightArrow />
      </div>
      <div className="flex flex-row gap-2">
        {stories.map((s) => (
          <StoryPreview key={s.slug} story={s} />
        ))}
      </div>
    </div>
  );
}

function StoryPreview({
  story,
}: {
  story: Awaited<ReturnType<typeof getStoriesForMember>>[0];
}) {
  return (
    <Link href={`/stories/${story.slug}`} className="w-1/2">
      <div className="flex flex-col">
        <SanityImageServer
          alt={`Image for Story ${story.title} `}
          image={story.image}
          height={255}
          width={255}
          aspectRatio="square"
          className="w-full aspect-[1/1]"
        />
        <div className="mt-[1.5px] pt-2 border-t-[4px] border-black">
          <h1 className="leading-none text-xl font-bold">{story.title}</h1>
          <span className="text-accent uppercase text-xs">
            {story.brand?.name} by Cake
          </span>
        </div>
      </div>
    </Link>
  );
}
