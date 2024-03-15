import { AddIcon } from "@danklabs/pattern-library/core";
import Link from "next/link";
import { CollectionPanel } from "./collection/CollectionPanel";
import { InvitationsPanel } from "./invitations/InvitationsPanel";
import { RewardsPanel } from "./rewards/RewardsPanel";
import { StoriesPanel } from "./stories/StoriesPanel";
import { MobileNavSpacer } from "@danklabs/cake/pattern-library/core";

export async function MemberDashboard() {
  return (
    <div className="p-4 flex flex-col items-center">
      <div className="container flex flex-col">
        <MobileNavSpacer />
        <div className="mb-[20px] md:mt-[48px]">
          <CollectionPanel />
        </div>
        <div className="md:mt-[46px] flex flex-col md:flex-row md:justify-evenly gap-10">
          <InvitationsPanel />
          <RewardsPanel />
          <StoriesPanel />
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="px-5 container flex flex-col-reverse md:flex-row gap-6">
  //     <div className="md:w-2/3 grow">
  //       <StoriesGrid />
  //     </div>
  //     <div className="md:w-1/3 md:max-w-[400px] flex flex-col gap-6">
  //       {member.passport.passes.length > 0 ? (
  //         <>
  //           <div className="flex flex-row items-center">
  //             <div className="grow">
  //               <PassportSummary passport={member.passport} />
  //             </div>
  //             <Link
  //               href="/brands"
  //               className="flex flex-row rounded-full p-3 items-center gap-2 bg-black/25 uppercase text-xs font-semibold tracking-widest"
  //             >
  //               <AddIcon className="stroke-primary text-2xl" />
  //               <span className="grow">Add Passes</span>
  //             </Link>
  //           </div>
  //           <PassportStack passport={member.passport} />
  //         </>
  //       ) : (
  //         <NoPasses />
  //       )}
  //       <div className="flex flex-col gap-4">
  //         <SectionHeading>Passbook Awards</SectionHeading>
  //         <div className="flex">
  //           <WalletCard
  //             content={
  //               <div className="h-full text-7xl text-primary font-light text-[#FBAFAA] flex flex-col justify-center font-pizzaz">
  //                 $50
  //               </div>
  //             }
  //             footer={
  //               <div className="flex flex-row gap-6">
  //                 <OutlineButton>Yes Please!</OutlineButton>
  //                 <OutlineButton>No thanks</OutlineButton>
  //               </div>
  //             }
  //           />
  //         </div>
  //       </div>
  //       <div className="flex flex-col gap-4">
  //         <SectionHeading>My Invitations</SectionHeading>
  //         <InvitationCard />
  //       </div>
  //       <div className="flex flex-col gap-4">
  //         <SectionHeading>Recently Added</SectionHeading>
  //         <div>put content cards here</div>
  //       </div>
  //     </div>
  //   </div>
  // );
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
        href="/brands"
        className="mt-10 flex flex-row border rounded-md p-2 items-center bg-black text-white"
      >
        <span className="grow">Select Brands</span>
        <AddIcon className="fill-slate-400 text-2xl" />
      </Link>
    </div>
  );
}
