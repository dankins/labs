import { clerkClient } from "@clerk/nextjs";
import { db, superAdmins } from "@danklabs/cake/db";
import { revalidateTag } from "next/cache";

export async function addSuperAdmin(email: string) {
  console.log("addSuperAdmin", email);

  let iam: string;
  const clerkUserByEmail = await clerkClient.users.getUserList({
    emailAddress: [email],
  });

  if (clerkUserByEmail.length === 0) {
    const newUser = await clerkClient.users.createUser({
      emailAddress: [email],
    });
    iam = newUser.id;
  } else {
    iam = clerkUserByEmail[0].id;
  }

  await db.insert(superAdmins).values([
    {
      iam,
      role: "super_admin",
    },
  ]);

  revalidateTag("get-super-admins");
}
