"use server";

import { invitations } from "@danklabs/cake/services/admin-service";
import { FormState } from "@danklabs/pattern-library/core";
import { isPostgresError, isZodError, validateFormData } from "@danklabs/utils";
import { redirect } from "next/navigation";
import { ZodError, z } from "zod";

export async function createCampaignAction(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const data = validateFormData(
      formData,
      z.object({
        name: z.string(),
        invitationsGranted: z.number({ coerce: true }),
        collectionItemsGranted: z.number({ coerce: true }),
        coupon: z
          .string()
          .transform((value) => (value === "" ? undefined : value))
          .optional(),
        memberEmail: z.string().optional(),
        revshare: z
          .number({ coerce: true })
          .min(0)
          .max(100)
          .transform((value) => value / 100)
          .transform((value) => (value === 0 ? undefined : value.toString()))
          .optional(),
      })
    );

    console.log("Creating Campaign Invitation", previousState, data);

    const campaign = await invitations.createCampaign(data);
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
    } else if (isZodError(err)) {
      console.log("zod validation error", JSON.stringify(err, null, 2));
      return {
        status: "error",
        fieldErrors: {},
        message: "Error validating input",
      };
    }

    console.error("error creating invitation", err);
    return {
      status: "error",
      fieldErrors: {},
      message: "Error creating campaign",
    };
  }
}

export async function createCampaignInvitationsAction(
  campaignSlug: string,
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  console.log("createCampaignInvitationsAction", formData);
  let mode: "single-use" | "multi-use";
  try {
    const modeData = validateFormData(
      formData,
      z.object({ mode: z.enum(["single-use", "multi-use"]) })
    );
    mode = modeData.mode;
  } catch (err) {
    return {
      status: "error",
      message:
        "Unable to determine whether to create multi-use or single use invites",
    };
  }

  try {
    if (mode === "single-use") {
      const data = validateFormData(
        formData,
        z.object({
          tranche: z.string(),
          count: z.number({ coerce: true }).positive(),
          coupon: z
            .string()
            .transform((value) => (value === "" ? undefined : value)),
        })
      );
      await invitations.createCampaignInvitations(campaignSlug, mode, data);
    } else {
      const data = validateFormData(
        formData,
        z.object({
          tranche: z.string(),
          code: z.string(),
          maxRedemptions: z.number({ coerce: true }).positive(),
          coupon: z
            .string()
            .transform((value) => (value === "" ? undefined : value)),
        })
      );
      await invitations.createCampaignInvitations(campaignSlug, mode, data);
    }
    return {
      status: "success",
      message: "Successfully created campaign invitations!",
    };
  } catch (err) {
    if (isZodError(err)) {
      return {
        status: "error",
        message: "Input validation error",
      };
    }
    if (isPostgresError(err)) {
      return {
        status: "error",
        message: "Error creating campaign invitations",
      };
    }
    console.error("error creating campaign invitations", err);

    return {
      status: "error",
      message: "An unknown error occurred",
    };
  }

  return { status: "error", message: "Error processing input" };
}
