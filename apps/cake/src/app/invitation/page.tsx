import { Centered, PageWithNavbar } from "@danklabs/pattern-library/core";
import { Invitation, db, invitations } from "@danklabs/cake/db";
import { eq } from "drizzle-orm";
import { faker } from "@faker-js/faker";

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
  const result = await db.query.invitations.findFirst({
    where: eq(invitations.code, code),
  });

  if (!result) {
    return <InvalidInviteCode />;
  }

  console.log(result);

  return <ValidInviteCode invitation={result} />;
}

function InvalidInviteCode() {
  return (
    <PageWithNavbar>
      <Centered>
        <h1>Invalid Code!</h1>
      </Centered>
    </PageWithNavbar>
  );
}

async function ValidInviteCode({ invitation }: { invitation: Invitation }) {
  const random = `${faker.word.adverb({
    length: { min: 5, max: 10 },
  })}_${faker.word.adjective({
    length: { min: 5, max: 10 },
  })}_${faker.word.noun({
    length: { min: 5, max: 10 },
  })}`;
  return (
    <PageWithNavbar>
      <Centered>
        <h1>{invitation.id}</h1>
        <h2>{random}</h2>
      </Centered>
    </PageWithNavbar>
  );
}
