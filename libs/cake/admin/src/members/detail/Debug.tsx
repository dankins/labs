import { members } from "@danklabs/cake/services/admin-service";
import { Suspense } from "react";

export async function Debug({ iam }: { iam: string }) {
  return (
    <Suspense>
      <Component iam={iam} />
    </Suspense>
  );
}
async function Component({ iam }: { iam: string }) {
  const member = await members.member.get(iam);

  return (
    <div className="flex flex-col gap-5 text-xs text-gray-500">
      <pre>{JSON.stringify(member, null, "\t")}</pre>
    </div>
  );
}
