import { auth } from "@clerk/nextjs/server";
import { members } from "@danklabs/cake/services/admin-service";
import { Paragraph1 } from "@danklabs/pattern-library/core";
import { SelectUsername } from "./SelectUsername";
import Link from "next/link";

export async function SelectUsernameBanner() {
  const { userId: iam } = auth().protect();
  const member = await members.member.get(iam);

  if (!member.username || member.profile.username.startsWith("member-")) {
    return (
      <div className="p-2 bg-[#E1DED9] rounded-sm border border-[#F3ECE6]">
        <Paragraph1>
          Cake is best with others. Set your username to join the rest of the
          Cake Community.
        </Paragraph1>
        <SelectUsername currentUsername={member.username} />
      </div>
    );
  }

  return (
    <div className="mb-4 p-2 bg-[#E1DED9] rounded-sm border border-[#F3ECE6]">
      View Profile:{" "}
      <Link href={`/community/${member.profile.username}`}>
        {member.profile.username}
      </Link>
    </div>
  );
}
