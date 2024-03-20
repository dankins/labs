import { clerkClient } from "@clerk/nextjs";
import { getMemberByIAM } from "@danklabs/cake/services/admin-service";
import { Suspense } from "react";

export async function Debug({ iam }: { iam: string }) {
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
    <div className="flex flex-col gap-5 text-xs text-gray-500">
      <pre>{JSON.stringify(user, null, "\t")}</pre>
      <pre>{JSON.stringify(dbUser, null, "\t")}</pre>
    </div>
  );
}
