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
    revalidatePath("/invitation");
    revalidatePath("/invitation?step=account");
  }
  startCookie(inviteCode, requiredCode, sponsor);
  if (i) {
    return {
      status: "success",
      redirect: `/invitation?i=${encodeURIComponent(i)}&step=welcome`,
    };
  } else {
    return {
      status: "success",
      redirect: `/invitation?step=welcome`,
    };
  }
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
    redirect: "/invitation?step=checkout",
  };
}
