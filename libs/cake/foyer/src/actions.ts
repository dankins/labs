"use server";
import { zfd } from "zod-form-data";

import {
  FormState,
  validateFormData,
  validateFormHelper,
} from "@danklabs/utils";
import { getCartIfAvailable, startCookie } from "@danklabs/cake/payments";
import { decodeI } from "./util/decodeI";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { cookies } from "next/headers";
import {
  invitations,
  members,
  stripe,
} from "@danklabs/cake/services/admin-service";
import { redirect } from "next/navigation";
import { DEFAULT_MAX_COLLECTION_ITEMS } from "libs/cake/services/admin-service/src/members/member/create";
import Stripe from "stripe";
import dayjs from "dayjs";

export async function submitPersonalAccessCodeAction(
  i: string | undefined,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const cart = getCartIfAvailable();
  let accessCode: string | undefined = undefined;
  try {
    const data = validateFormData(
      formData,
      zfd.formData({
        accessCode: zfd.text(),
      })
    );
    accessCode = data.accessCode;
  } catch (err) {
    return { status: "error", message: "Invalid Access Code" };
  }

  if (!i && !cart) {
    return { status: "error", message: "Could not locate invite" };
  }

  let inviteCode = !i ? cart?.code : undefined;
  let requiredCode = !i ? cart?.accessCode : undefined;
  let sponsor = !i ? cart?.sponsor : undefined;
  if (!inviteCode || !requiredCode || !sponsor) {
    if (!i) {
      return { status: "error", message: "Could not locate invite" };
    }

    try {
      [inviteCode, requiredCode, sponsor] = decodeI(i);
      console.log("submitPersonalAccessCodeAction", {
        i,
        accessCode,
        inviteCode,
        requiredCode,
      });
    } catch (err) {
      return { status: "error", message: "Could not locate invite" };
    }
  }

  if (accessCode.toLowerCase() === requiredCode.toLowerCase()) {
    if (i) {
      return {
        status: "success",
        redirect: `/invitation?i=${encodeURIComponent(
          i
        )}&step=verify-ownership`,
      };
    } else {
      return {
        status: "success",
        redirect: `/invitation?step=verify-ownership`,
      };
    }
  } else {
    return { status: "error", message: "Invalid Access Code" };
  }
}

export async function verifyOwnershipAction(
  i: string | undefined,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const userAuth = auth();
  const cart = getCartIfAvailable();
  let sponsorInput: string | undefined = undefined;
  try {
    const data = validateFormData(
      formData,
      zfd.formData({
        sponsor: zfd.text(),
      })
    );
    sponsorInput = data.sponsor;
  } catch (err) {
    return { status: "error", message: "Invalid Input" };
  }

  if (!i && !cart) {
    return { status: "error", message: "Could not locate invite" };
  }

  let inviteCode = !i ? cart?.code : undefined;
  let requiredCode = !i ? cart?.accessCode : undefined;
  let sponsor = !i ? cart?.sponsor : undefined;
  if (!inviteCode || !requiredCode || !sponsor) {
    if (!i) {
      return { status: "error", message: "Could not locate invite" };
    }
    try {
      [inviteCode, requiredCode, sponsor] = decodeI(i);
    } catch (err) {
      return { status: "error", message: "Could not locate invite" };
    }
  }
  if (sponsor.toLowerCase() !== sponsorInput.toLowerCase()) {
    return { status: "error", message: "Invalid Sponsor" };
  }

  if (userAuth.sessionId) {
    await clerkClient.sessions.revokeSession(userAuth.sessionId!);
    cookies().delete("__session");
    revalidatePath("/invitation");
    revalidatePath("/invitation?step=account");
  }
  startCookie(inviteCode, requiredCode, sponsor);
  return {
    status: "success",
    redirect: `/invitation?step=welcome`,
  };
}

export async function updateAddressAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { userId: iam } = auth().protect();
  const [data, error] = validateFormHelper(
    formData,
    zfd.formData({
      address: zfd.text(),
      address2: zfd.text(z.string().optional()),
      city: zfd.text(),
      state: zfd.text(),
      postalCode: zfd.text(),
      countryCode: zfd.text(),
    })
  );
  if (error) {
    console.log("error validating input!", error);
    return error;
  }

  try {
    console.log("updating address", iam);
    await clerkClient.users.updateUserMetadata(iam, {
      privateMetadata: {
        address: data,
      },
    });
    console.log("updating address success", iam);
  } catch (err) {
    console.error("error updating clerk metadata address", err);
    return { status: "error", message: "Error updating address" };
  }

  return {
    status: "success",
    message: "Success!",
    redirect: "/invitation?step=contact",
  };
}

export async function updatePhoneAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { userId: iam } = auth().protect();
  const [data, error] = validateFormHelper(
    formData,
    zfd.formData({
      phone: zfd.text(),
      consent: zfd.checkbox(),
    })
  );
  if (error) {
    console.log("error validating input!", error);
    return error;
  }

  try {
    console.log("updating address", iam);
    await clerkClient.phoneNumbers.createPhoneNumber({
      userId: iam,
      phoneNumber: data.phone,
      primary: true,
      verified: false,
    });
    console.log("updating address success", iam);
  } catch (err) {
    console.error("error updating clerk metadata address", err);
    return { status: "error", message: "Error updating address" };
  }

  return {
    status: "success",
    message: "Success!",
    redirect: "/collection",
  };
}

export async function onSignupSuccess(
  mode: "already-authenticated" | "signup" | "signin",
  iam: string
) {
  const cart = getCartIfAvailable();
  if (!cart) {
    throw new Error("no cart available");
  }
  const customer = await stripe.payments.getCustomer(cart.id);
  const stripeCustomerId = customer.id;

  const subcription = await stripe.payments.getSubscriptionByCustomerId(
    customer.id
  );
  if (!subcription) {
    throw new Error("no subscription available");
  }
  const stripeSubscriptionId = subcription.id;

  const invitation = await invitations.getByCode.cached(cart.code);
  if (!invitation) {
    throw new Error("no invitation available");
  }

  const newUserData: Parameters<typeof members.member.getOrCreateByIAM>[1] = {
    invitationId: invitation.id,
    stripeCustomerId,
    stripeSubscriptionId,
    maxCollectionItems:
      invitation.collectionItemsGranted ||
      invitation.campaign?.collectionItemsGranted ||
      DEFAULT_MAX_COLLECTION_ITEMS,
  };

  const member = await members.member.getOrCreateByIAM(iam, newUserData);
  if (member.membershipStatus !== "active" && member.stripeSubscriptionId) {
    const renewal = determineRenewalDate(
      (subcription.latest_invoice as any).lines.data[0].period.end
    );
    await members.member.activateMembership(
      member.iam,
      member.stripeSubscriptionId,
      renewal
    );
  }
  return redirect("/invitation?step=profile");
}

function determineRenewalDate(periodEndUnix: number): Date {
  try {
    return dayjs.unix(periodEndUnix).toDate();
  } catch (err) {
    console.error("could not determine renewal date", err);
    return dayjs().add(1, "year").toDate();
  }
}
