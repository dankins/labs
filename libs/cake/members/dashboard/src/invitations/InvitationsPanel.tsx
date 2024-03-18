import { Spinner } from "libs/pattern-library/core/src/icons/Spinner";
import { Suspense } from "react";

export async function InvitationsPanel() {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
}

function Loading() {
  return <Spinner />;
}

function Component() {
  return (
    <div className="w-full">
      <div className="flex flex-row">
        <h1 className="grow uppercase font-bold text-[20px] md:text-[32px]">
          My Invitations
        </h1>
      </div>
    </div>
  );
}
