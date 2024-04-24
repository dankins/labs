import { Suspense, useState } from "react";
import { currentUser } from "@clerk/nextjs/server";

import { ProfileToggle } from "./ProfileToggle";
import { updateProfileAction } from "./actions";
import { Heading4 } from "@danklabs/pattern-library/core";

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
  const user = await currentUser();

  if (!user) {
    throw new Error("user not available");
  }

  return (
    <div className="max-w-[764px]">
      <div>
        <div>
          <Heading4>Member Profile</Heading4>
          <h3 className="text-primary/50 text-lg font-normal">
            {user.emailAddresses[0].emailAddress}
          </h3>
          <p className="text-base font-normal">
            Manage your personal settings associated to your Cake account.
          </p>
        </div>
        <ProfileToggle
          profile={{
            firstName: user.firstName,
            lastName: user.lastName,
            phone: null,
            email: user.emailAddresses[0].emailAddress,
          }}
          action={updateProfileAction}
        />
      </div>
    </div>
  );
}
