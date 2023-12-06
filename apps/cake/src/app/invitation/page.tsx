import { Centered, PageWithNavbar } from "@danklabs/pattern-library/core";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (searchParams?.code) {
  }

  return <HasInviteCode code={searchParams?.code as string} />;
}

function NoInviteCode() {
  return (
    <PageWithNavbar>
      <Centered>no invite code</Centered>
    </PageWithNavbar>
  );
}

async function HasInviteCode({ code }: { code: string }) {
  const allInvitations = await prisma.invitation.findMany();
  console.log(allInvitations);

  return (
    <PageWithNavbar>
      <Centered>
        <h1>{code}</h1>
      </Centered>
    </PageWithNavbar>
  );
}

function InvalidInviteCode() {
  return <div>invalid code</div>;
}

async function ValidInviteCode() {
  return <div>valid code</div>;
}
