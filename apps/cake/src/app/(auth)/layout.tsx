import { auth } from "@clerk/nextjs/server";
import { AppShell } from "@danklabs/cake/pattern-library/core";
import { members } from "@danklabs/cake/services/admin-service";
import { NotAMember } from "./NotAMember";
import { ClerkProvider } from "@clerk/nextjs";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId: iam } = auth().protect();
  const member = await members.member.get(iam);
  if (member.membershipStatus !== "active") {
    return <NotAMember />;
  }

  return (
    <ClerkProvider>
      <AppShell authComponent={<></>}>{children}</AppShell>
    </ClerkProvider>
  );
}
