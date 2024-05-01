import { auth } from "@clerk/nextjs/server";
import { members } from "@danklabs/cake/services/admin-service";
import {
  ActionButton,
  ChevronRightIcon,
  Heading4,
  SecondaryButton,
} from "@danklabs/pattern-library/core";
import { addConnectionAction } from "../actions";

export async function ConnectionRequests() {
  const { userId: iam } = auth().protect();
  const connections = await members.community.getConnections(iam, true);
  return (
    <div className="flex flex-col gap-4">
      <Heading4>Connection Requests</Heading4>
      <div className="flex flex-col gap-4">
        {connections.map((c) => (
          <div key={c.id} className="flex flex-row">
            <div className="grow">
              <ChevronRightIcon /> {c.follower.username}
            </div>
            <ActionButton
              action={addConnectionAction.bind(undefined, c.follower.username!)}
              size="sm"
            >
              Accept
            </ActionButton>
          </div>
        ))}
      </div>
    </div>
  );
}
