import { clerkClient } from "@clerk/nextjs";
import { getMemberByIAM } from "@danklabs/cake/services/admin-service";
import { Suspense } from "react";

export async function MemberInfo({ iam }: { iam: string }) {
  return (
    <Suspense>
      <Component iam={iam} />
    </Suspense>
  );
}

async function Component({ iam }: { iam: string }) {
  const [user, dbUser] = await Promise.all([
    clerkClient.users.getUser(iam),
    getMemberByIAM(iam),
  ]);

  return (
    <>
      <div className="text-bold text-3xl">
        {user.firstName} {user.lastName}
      </div>
      <div className="text-semibold text-xl">
        {
          user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
            ?.emailAddress
        }
      </div>
    </>
  );
}
