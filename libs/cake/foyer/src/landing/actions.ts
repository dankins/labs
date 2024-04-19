"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";

import { validateFormData } from "@danklabs/utils";
import { db, invitations } from "@danklabs/cake/db";

import { getCartIfAvailable, setEmail, startCookie } from "../cookie";
import {
  trackInvitationCodeSubmitted,
  trackInvitationEmailSubmitted,
} from "@danklabs/cake/events";
import { clerkClient, auth } from "@clerk/nextjs/server";
import { members } from "@danklabs/cake/services/admin-service";

export async function submitEmail(formData: FormData): Promise<void> {
  "use server";
  const data = validateFormData(
    formData,
    z.object({ email: z.string().email() })
  );
  setEmail(data.email);

  const userAuth = auth();
  if (userAuth.userId) {
    const user = await members.member.get(userAuth.userId);
    if (user && user.email.toLowerCase() === data.email.toLowerCase()) {
      console.log("revoke session", user.email, data.email);
      await clerkClient.sessions.revokeSession(userAuth.sessionId!);
    }
  }

  trackInvitationEmailSubmitted(data.email);
  redirect(`/invitation?step=account`);
}

export async function submitInviteCode(
  formData: FormData
): Promise<"valid" | "invalid" | "expired"> {
  "use server";
  console.log("submit invite code");
  const data = validateFormData(formData, z.object({ code: z.string() }));
  const invitation = await db.query.invitations.findFirst({
    where: eq(invitations.code, data.code),
  });

  if (!invitation) {
    redirect(`/invitation?code=${data.code}&error=invalid`);
    return "invalid";
  }
  if (dayjs(invitation.expiration).isBefore(dayjs())) {
    redirect(`/invitation?code=${data.code}&error=expired`);
    return "expired";
  }

  const maybeCart = getCartIfAvailable();
  if (maybeCart) {
    const cartCookie = maybeCart;
    // start with a fresh cart if the code is not the same as the one in the cookie
    if (invitation && invitation.code !== cartCookie.code) {
      startCookie(invitation.code!);
    }
  } else {
    startCookie(invitation.code!);
  }

  trackInvitationCodeSubmitted(data.code);
  redirect(`/invitation?code=${data.code}&validated=true`);
  return "valid";
}
