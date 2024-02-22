"use server";

import { identify, track } from "libs/cake/events/src/server/serverTracking";
import type { Name, Address, Contact } from "./AccountStep";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { UserTraits } from "@segment/analytics-next";
import { TrackInvitationAccountCompleted } from "@danklabs/cake/events";

export async function completeAccountStepAction(
  email: string,
  name: Name,
  address: Address,
  contact: Contact
) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("user not authenticated");
  }

  const event: TrackInvitationAccountCompleted = {
    name: "Invitation Account Completed",
    email: name.email || email,
    firstName: name.firstname,
    lastName: name.lastname,
  };
  const traits: UserTraits = {
    email: name.email || email,
    firstName: name.firstname,
    lastName: name.lastname,
    phone: name.phone,
    address,
  };
  identify(userId, traits);
  track(userId, event);
  redirect("/invitation?step=checkout");
}
