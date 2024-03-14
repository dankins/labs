import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";
import { Suspense } from "react";
import { Summary } from "./Summary";
import { CardGrid } from "./CardGrid";
import {
  cachedGetBrandsBySlug,
  cachedGetMember,
  cachedGetMemberCollection,
} from "@danklabs/cake/services/admin-service";
import { auth } from "@clerk/nextjs";

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
  const { userId } = auth();
  if (!userId) {
    throw new Error("not authenticated");
  }
  const [collection, member] = await Promise.all([
    cachedGetMemberCollection(userId),
    cachedGetMember(userId),
  ]);

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <Summary collectionValue={collection.value} />
      <CardGrid memberFirstName={member.firstName} collection={collection} />
    </div>
  );
}
