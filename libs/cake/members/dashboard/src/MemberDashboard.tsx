import { auth } from "@clerk/nextjs";
import { getMemberByIAM } from "@danklabs/cake/services/admin-service";
import { AddIcon } from "@danklabs/pattern-library/core";
import Link from "next/link";
import { PassportStack } from "./PassportStack";
import { ContentPlaceholder } from "./ContentPlaceholder";

export async function MemberDashboard() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("userid not available");
  }

  const member = await getMemberByIAM(userId, { passport: true });
  if (!member) {
    return <div>error loading dashboard: invalid member id</div>;
  }

  return (
    <div className="container flex flex-col-reverse md:flex-row gap-6">
      <div className="md:w-2/3">
        <ContentPlaceholder />
      </div>
      <div className="md:w-1/3">
        <PassportStack passport={member.passport} />
        <Link
          href="/members/passes/add"
          className="mt-10 flex flex-row border rounded-md p-2 items-center"
        >
          <span className="grow">Add Additional Passes</span>
          <AddIcon className="fill-slate-400 text-2xl" />
        </Link>
      </div>
    </div>
  );
}
