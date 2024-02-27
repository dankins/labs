import { Suspense, useState } from "react";
import { ProfileToggle } from "./ProfileToggle";
import { currentUser } from "@clerk/nextjs";

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
    <div>
      <div>
        <h1 className="text-primary text-xl font-normal">Member Profile</h1>
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
      />
    </div>
  );
}
