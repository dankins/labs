"use server";
import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

export async function createBrandAction(formData: FormData): Promise<void> {
  const form = Object.fromEntries(formData.entries());
  const createBrandSchema = z.object({
    email: z.string(),
  });
  const data = createBrandSchema.parse(form);

  const request: Parameters<typeof clerkClient.users.createUser>[0] = {
    emailAddress: [data.email],
  };
  console.log("going to create user", request);
  // create the user account
  try {
    const result = await clerkClient.users.createUser(request);
    console.log("created user", result);

    const userId = result.id;

    const org = await clerkClient.organizations.createOrganization({
      name: "Cake",
      slug: "cake",
      createdBy: userId,
    });
    console.log("created org", org);
  } catch (err) {
    console.error("really big err", err);
    throw err;
  }
}
