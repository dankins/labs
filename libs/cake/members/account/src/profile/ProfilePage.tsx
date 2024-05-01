import { Suspense, useState } from "react";
import { auth, currentUser } from "@clerk/nextjs/server";

import { ProfileToggle } from "./ProfileToggle";
import { updateProfileAction } from "./actions";
import { Heading4 } from "@danklabs/pattern-library/core";
import { members } from "@danklabs/cake/services/admin-service";

export function ProfilePage() {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
}

function Loading() {
  return <div></div>;
}

export async function Component() {
  const { userId: iam } = auth().protect();
  const member = await members.member.get(iam);

  if (!member) {
    throw new Error("member not available");
  }

  return (
    <div className="max-w-[764px] flex flex-col gap-6">
      <div>
        <div>
          <Heading4>Member Profile</Heading4>
          <h3 className="text-primary/50 text-lg font-normal">
            {member.email}
          </h3>
          <p className="text-base font-normal">
            Manage your personal settings associated to your Cake account.
          </p>
        </div>
        <ProfileToggle
          profile={{
            firstName: member.firstName,
            lastName: member.lastName,
            phone: null,
            email: member.email,
          }}
          action={updateProfileAction}
        />
      </div>
    </div>
  );
}
