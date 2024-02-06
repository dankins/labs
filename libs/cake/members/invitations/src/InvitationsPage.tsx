import { Suspense } from "react";
import { MyInvitations } from "./MyInvitations";

export async function InvitationsPage() {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}

async function Component() {
  return (
    <div className="px-5 container mb-24">
      <MyInvitations />
    </div>
  );
}
