import { auth } from "@clerk/nextjs";
import { getMemberByIAM } from "@danklabs/cake/services/admin-service";
import { AddIcon } from "@danklabs/pattern-library/core";
import Link from "next/link";
import { PassportStack } from "./PassportStack";
import { ContentPlaceholder } from "./ContentPlaceholder";
import { PassportSummary } from "./PassportSummary";

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
        {member.passport.passes.length > 0 ? (
          <>
            <div className="py-4 flex flex-row items-center">
              <h1 className="text-2xl grow">Passport</h1>
              <PassportSummary passport={member.passport} />
            </div>
            <PassportStack passport={member.passport} />
            <Link
              href="/brands"
              className="mt-10 flex flex-row border rounded-md p-2 items-center"
            >
              <span className="grow">Add Additional Passes</span>
              <AddIcon className="fill-slate-400 text-2xl" />
            </Link>
          </>
        ) : (
          <NoPasses />
        )}
      </div>
    </div>
  );
}

function NoPasses() {
  return (
    <div className="border rounded p-5">
      <h1 className="font-bold text-lg">Build Out Your Passport</h1>
      <p className="text-sm">
        Select Brands to add to your passport and gain access to the benefits
        offered. Add up to ten brands yearly, with new brands being added
        throughout the year.
      </p>
      <Link
        href="/passport/passes/add"
        className="mt-10 flex flex-row border rounded-md p-2 items-center bg-black text-white"
      >
        <span className="grow">Select Brands</span>
        <AddIcon className="fill-slate-400 text-2xl" />
      </Link>
    </div>
  );
}
