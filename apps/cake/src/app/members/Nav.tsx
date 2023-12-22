import { auth, currentUser, clerkClient, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";

export function Nav() {
  const { userId, organization } = auth();
  return (
    <nav className="flex flex-row p-4">
      <Link href="/" className="text-2xl">
        🎂
      </Link>
      <span className="grow"></span>
      <div>
        {!userId ? <Link href="/sign-in">Member Login</Link> : <LoggedIn />}
      </div>
    </nav>
  );
}

async function LoggedIn() {
  return (
    <Suspense>
      <LoggedInLoaded />
    </Suspense>
  );
}

async function LoggedInLoading() {
  return <div>Welcome</div>;
}

async function LoggedInLoaded() {
  const { userId } = auth();
  if (userId) {
    const orgMembers = await clerkClient.users.getOrganizationMembershipList({
      userId,
    });
  }

  let isAdmin = false;
  if (userId) {
    const orgMembers = await clerkClient.users.getOrganizationMembershipList({
      userId,
    });

    isAdmin =
      orgMembers.findIndex((om) => om.organization.slug === "cake") >= 0;
  }

  return <UserButton afterSignOutUrl={"/"} />;
}
