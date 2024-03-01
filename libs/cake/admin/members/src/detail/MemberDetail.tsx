import { SectionHeading } from "@danklabs/cake/pattern-library/core";
import { MemberInfo } from "./MemberInfo";
import { SubscriptionInfo } from "./SubscriptionInfo";
import { Debug } from "./Debug";
import { Invitations } from "./Invitations";
import { Passes } from "./Passes";
import { Favorites } from "./Favorites";

export async function MemberDetail({ iam }: { iam: string }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <SectionHeading>Member</SectionHeading>
        <MemberInfo iam={iam} />
      </div>
      <div>
        <SectionHeading>Subscription</SectionHeading>
        <SubscriptionInfo iam={iam} />
      </div>
      <div>
        <SectionHeading>Invitations</SectionHeading>
        <Invitations iam={iam} />
      </div>
      <div>
        <SectionHeading>Passes</SectionHeading>
        <Passes iam={iam} />
      </div>
      <div>
        <SectionHeading>Favorites</SectionHeading>
        <Favorites iam={iam} />
      </div>
      <div>
        <SectionHeading>Debug</SectionHeading>
        <Debug iam={iam} />
      </div>

      {/* <div>{JSON.stringify(user)}</div>
      <div>{JSON.stringify(dbUser)}</div> */}
    </div>
  );
}
