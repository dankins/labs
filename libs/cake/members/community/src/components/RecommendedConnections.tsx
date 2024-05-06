import { auth } from "@clerk/nextjs/server";
import { members } from "@danklabs/cake/services/admin-service";
import { ChevronRightIcon, Heading4 } from "@danklabs/pattern-library/core";
import Link from "next/link";
import { Suspense } from "react";

export async function RecommendedConnections() {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}

async function Component() {
  const { userId: iam } = auth().protect();

  const recommendations = await members.community.recommendConnections(iam);
  return (
    <div className="flex flex-col gap-4">
      <Heading4>Recommendations</Heading4>
      <div className="flex flex-col gap-2">
        {recommendations.map((recommendation) => (
          <Link
            href={`/community/${recommendation.username}`}
            key={recommendation.username}
          >
            <ChevronRightIcon /> {recommendation.username}
          </Link>
        ))}
      </div>
    </div>
  );
}
