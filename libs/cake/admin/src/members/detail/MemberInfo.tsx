import { clerkClient } from "@clerk/nextjs";
import { members } from "@danklabs/cake/services/admin-service";
import { Suspense } from "react";

export async function MemberInfo({ iam }: { iam: string }) {
  return (
    <Suspense>
      <Component iam={iam} />
    </Suspense>
  );
}

async function Component({ iam }: { iam: string }) {
  const member = await members.member.get(iam);
  return (
    <>
      <div className="text-bold text-3xl">
        {member.firstName} {member.lastName}
      </div>
      <div className="text-semibold text-xl">{member.email}</div>
    </>
  );
}
