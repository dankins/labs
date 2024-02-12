import z from "zod";
import { clerkClient } from "@clerk/nextjs";
import { Suspense } from "react";
import { AccountClient } from "./AccountClient";
import { Container } from "../brand-selection/Container";

export type AccountProps = {};
export function Account({}: AccountProps) {
  return (
    <Suspense>
      <Container>
        <Loaded />
      </Container>
    </Suspense>
  );
}

export async function Loaded() {
  clerkClient;
  // IMPORTANT: this assumes the email address has been validated
  // make sure this comes from a flow that originates from a valid invite code, for example
  async function createAccountWithVerifiedEmail(
    formData: FormData
  ): Promise<string> {
    "use server";
    const form = Object.fromEntries(formData.entries());
    const createAccountSchema = z.object({
      email: z.string(),
    });
    const data = createAccountSchema.parse(form);

    const request: Parameters<typeof clerkClient.users.createUser>[0] = {
      emailAddress: [data.email],
    };

    const result = await clerkClient.users.createUser(request);
    const ticket = await clerkClient.signInTokens.createSignInToken({
      userId: result.id,
      expiresInSeconds: 60 * 60,
    });

    return ticket.token;
  }

  return (
    <AccountClient
      createAccountWithVerifiedEmail={createAccountWithVerifiedEmail}
    />
  );
}
