"use server";
import { zfd } from "zod-form-data";

import { FormState } from "@danklabs/pattern-library/core";
import { validateFormData } from "@danklabs/utils";
import { redirect } from "next/navigation";
import { getCartIfAvailable, startCookie } from "./cookie";
import { decodeI } from "./util/decodeI";

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

  let inviteCode = cart?.code;
  let requiredCode = cart?.accessCode;
  let sponsor = cart?.sponsor;
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

  let inviteCode = cart?.code;
  let requiredCode = cart?.accessCode;
  let sponsor = cart?.sponsor;
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
