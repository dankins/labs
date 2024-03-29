import { invitations } from "@danklabs/cake/services/admin-service";
import {
  Heading1,
  Paragraph4,
  PrimaryButton,
  Spinner,
} from "@danklabs/pattern-library/core";
import { Suspense } from "react";

export async function CampaignInvitesList() {
  return (
    <Suspense
      fallback={
        <div>
          <Spinner />
        </div>
      }
    >
      <Component />
    </Suspense>
  );
}

async function Component() {
  const invites = await invitations.getCampaignInvites();

  if (invites.length === 0) {
    return (
      <div className="py-20 bg-white/70 p-4 flex flex-col items-center align-center gap-5 ">
        <Heading1 className="text-2xl">
          No Campaign Invitations have been created yet.
        </Heading1>
        <PrimaryButton href={`?action=create`}>Create</PrimaryButton>
      </div>
    );
  }
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <table className="w-full text-left table-auto">
        <thead>
          <th>
            <strong>Campaign</strong>
          </th>
          <th>Code</th>
          <th>Revenue Share</th>
          <th>Redemptions</th>
        </thead>
        <tbody>
          {invites.map((invite) => (
            <tr>
              <td>{invite.campaign}</td>
              <td>{invite.code}</td>
              <td>{invite.revshare}</td>
              <td>
                {invite.redemptions} / {invite.maxRedemptions}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
