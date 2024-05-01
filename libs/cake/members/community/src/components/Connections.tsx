import { auth } from "@clerk/nextjs/server";
import { members } from "@danklabs/cake/services/admin-service";
import {
  ActionButton,
  ChevronRightIcon,
  Heading4,
} from "@danklabs/pattern-library/core";
import Link from "next/link";

export async function Connections() {
  const { userId: iam } = auth().protect();
  const connections = await members.community.getConnections(iam);
  return (
    <div className="flex flex-col gap-4">
      <Heading4>Connections</Heading4>
      <div className="flex flex-col gap-4">
        {connections.map((c) => (
          <div key={c.id} className="flex flex-row">
            <Link href={`/community/${c.follows.username}`} className="grow">
              <ChevronRightIcon /> {c.follows.username}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
