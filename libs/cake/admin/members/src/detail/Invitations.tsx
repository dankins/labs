import Link from "next/link";
import { Suspense } from "react";

export async function Invitations({ iam }: { iam: string }) {
  return (
    <Suspense>
      <Component iam={iam} />
    </Suspense>
  );
}
async function Component({ iam }: { iam: string }) {
  const invitedByIAM = "x";
  const invitedByIAMName = "Hank Hill";

  return (
    <div>
      <div>
        <h3>
          Invited By:{" "}
          <Link href={`/admin/members/${invitedByIAM}`} className="font-bold">
            {invitedByIAMName}
          </Link>
        </h3>
      </div>
    </div>
  );
}
