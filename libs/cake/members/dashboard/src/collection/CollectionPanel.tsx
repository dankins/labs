import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";
import { Suspense } from "react";
import { Summary } from "./Summary";
import { CardGrid } from "./CardGrid";
import { members } from "@danklabs/cake/services/admin-service";
import { auth } from "@clerk/nextjs/server";

export async function CollectionPanel() {
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
  const member = await members.member.get(userId);
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <Summary collectionValue={member.collection.value} />
      <CardGrid member={member} />
    </div>
  );
}
