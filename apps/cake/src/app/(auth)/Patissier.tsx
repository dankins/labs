import { auth } from "@clerk/nextjs";
import { cachedGetMember } from "@danklabs/cake/services/admin-service";
import { SecondaryButton } from "@danklabs/pattern-library/core";
import { Suspense } from "react";
import { PatissierButton } from "./PatissierButton";

export function Patissier() {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}

export async function Component() {
  const { userId } = auth();
  if (!userId) return null;
  const member = await cachedGetMember(userId);

  if (member.isSuperAdmin) {
    return (
      <div className="bg-secondary text-white p-3 flex flex-row items-center gap-3 text-xs">
        <span className="grow">You are viewing as a super admin.</span>
        <PatissierButton />
      </div>
    );
  }

  return null;
}
