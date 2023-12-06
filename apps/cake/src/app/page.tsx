import { auth, currentUser, clerkClient } from "@clerk/nextjs";
import { PageContent, PageWithNavbar } from "@danklabs/pattern-library/core";
import { Shh } from "./Shh";
import { Nav } from "./Nav";
import { Suspense } from "react";
import { AdminHomepage } from "./AdminHomepage";
import { redirect } from "next/navigation";
import { LoggedOutPage } from "./LoggedOutPage";

export const revalidate = 1; // revalidate at every 60 seconds

export type UserType =
  | "LOGGED_OUT"
  | "NON_MEMBER"
  | "MEMBER"
  | "MEMBER_EXPIRED"
  | "MEMBER_INVITED"
  | "ADMIN"
  | "BRAND_ADMIN";

async function getUserType(): Promise<UserType> {
  const { userId } = auth();
  if (!userId) {
    return "LOGGED_OUT";
  }

  const orgMembers = await clerkClient.users.getOrganizationMembershipList({
    userId,
  });

  // if no orgMembers they must be a normal user
  if (orgMembers.length === 0) {
    return "NON_MEMBER";
  }

  if (orgMembers.findIndex((om) => om.organization.slug === "cake") >= 0) {
    return "ADMIN";
  }

  return "BRAND_ADMIN";
}

export default async function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Loaded />
    </Suspense>
  );
}

function Loading() {
  return <div>loading</div>;
}

async function Loaded() {
  const userType = await getUserType();
  switch (userType) {
    case "ADMIN":
      return redirect("/admin");
    case "BRAND_ADMIN":
      return redirect("/brand-admin");
    case "LOGGED_OUT":
      return <LoggedOutPage />;
    case "MEMBER":
      return <div>MEMBER</div>;
    case "MEMBER_EXPIRED":
      return <div>MEMBER_EXPIRED</div>;
    case "MEMBER_INVITED":
      return <div>MEMBER_INVITED</div>;
    case "NON_MEMBER":
      return <div>NON_MEMBER</div>;
  }

  const _exhausted: never = userType;
  throw new Error("");
}
