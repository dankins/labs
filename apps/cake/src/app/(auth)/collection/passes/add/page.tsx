import { auth } from "@clerk/nextjs";
import { getMemberByIAM } from "@danklabs/cake/services/admin-service";
import { SelectPasses } from "libs/cake/members/dashboard/src/SelectPasses";

export default async function Page() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("userid not available");
  }

  const member = await getMemberByIAM(userId, { passport: true });
  if (!member) {
    return <div>error loading dashboard: invalid member id</div>;
  }

  return (
    <div>
      <SelectPasses passport={member.passport} />
    </div>
  );
}
