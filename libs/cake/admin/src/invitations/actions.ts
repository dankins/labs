"use server";

import { invitations } from "@danklabs/cake/services/admin-service";
import { FormState } from "@danklabs/pattern-library/core";
import { isPostgresError, validateFormData } from "@danklabs/utils";
import { redirect } from "next/navigation";
import { PostgresError } from "postgres";
import { z } from "zod";

export async function createCampaignInvitationAction(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = validateFormData(
    formData,
    z.object({
      campaign: z.string(),
      code: z.string(),
      maxRedemptions: z.number({ coerce: true }),
      revshare: z
        .number({ coerce: true })
        .min(0)
        .max(100)
        .transform((value) => value / 100)
        .transform((value) => (value === 0 ? undefined : value))
        .optional(),
      invitationsGranted: z
        .number({ coerce: true })
        .transform((value) => (value === 0 ? undefined : value))
        .optional(),
      collectionItemsGranted: z
        .number({ coerce: true })
        .transform((value) => (value === 0 ? undefined : value))
        .optional(),
      coupon: z
        .string()
        .transform((value) => (value === "" ? undefined : value))
        .optional(),
    })
  );

  console.log("Creating Campaign Invitation", previousState, data);
  try {
    const invitation = await invitations.createCampaignInvitation(data);
    redirect(`/admin/invitations`);
    return {
      status: "success",
      message: "Campaign Invitation Created",
    };
  } catch (err) {
    if (isPostgresError(err)) {
      if (err.constraint_name === "invitations_code_unique") {
        return {
          status: "error",
          message:
            "An invitation with this code already exists. Please choose a different code.",
        };
      }
    }

    console.error("error creating invitation", err);
    return {
      status: "error",
      fieldErrors: {},
      message: "Error creating campaign invitation",
    };
  }
}
