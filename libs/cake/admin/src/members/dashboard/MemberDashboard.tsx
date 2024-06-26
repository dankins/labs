import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";

export async function MemberDashboard() {
  const users = await clerkClient.users.getUserList();
  return (
    <div>
      <h1>Members</h1>
      <div>
        {users.data.map((u) => (
          <div>
            <Link href={`/admin/members/${u.id}`}>
              {u.emailAddresses[0].emailAddress}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
