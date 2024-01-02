import { auth } from "@clerk/nextjs";
import { getMemberByIAM } from "@danklabs/cake/services/admin-service";
import { Button, Centered } from "@danklabs/pattern-library/core";
import { SelectPasses } from "./SelectPasses";
import Link from "next/link";

export async function MemberDashboard() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("userid not available");
  }

  const member = await getMemberByIAM(userId, { passport: true });
  if (!member) {
    return <div>error loading dashboard: invalid member id</div>;
  }

  return (
    <Centered>
      {member.passport.passes.length === 0 && (
        <div>
          <div>You do not have any Cake Passes yet!</div>
          <div>Passport: {member.passport.id}</div>
          <SelectPasses ownedPassBrandSlugs={[]} passport={member.passport} />
        </div>
      )}
      {member.passport.passes.length > 0 && (
        <div>
          <PassList passes={member.passport.passes} />

          <SelectPasses
            ownedPassBrandSlugs={member.passport.passes.map(
              (p) => p.brand.slug
            )}
            passport={member.passport}
          />
        </div>
      )}
    </Centered>
  );
}

export function PassList({
  passes,
}: {
  passes: NonNullable<
    Awaited<ReturnType<typeof getMemberByIAM>>
  >["passport"]["passes"];
}) {
  return (
    <div>
      <h1>Passes:</h1>
      <div className="grid grid-cols-3">
        {passes.map((pass) => (
          <Link key={pass.id} href={`/members/passes/${pass.brand.slug}`}>
            <div className="m-3 p-3 border">{pass.brand.slug}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
