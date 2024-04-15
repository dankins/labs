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
    <div className="flex flex-col gap-4 md:p-4 md:max-w-[720px] md:flex-wrap xl:w-[720px]">
      <Summary
        items={member.collection.count}
        maxItems={member.collection.maxCollectionItems}
        collectionValue={member.collection.value}
      />
      <CardGrid member={member} />
    </div>
  );
}
