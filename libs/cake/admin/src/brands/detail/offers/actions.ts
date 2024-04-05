"use server";

import { admin } from "@danklabs/cake/services/admin-service";
import { FormState } from "@danklabs/pattern-library/core";
import { isPostgresError, isZodError, validateFormData } from "@danklabs/utils";
import { z } from "zod";
import { zfd } from "zod-form-data";

export async function createOfferAction(
  brandSlug: string,
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  console.log("create offer", { brandSlug, previousState, formData });
  let data: Parameters<typeof admin.offers.createBrandPassOffer>[1] | undefined;
  try {
    data = validateFormData(
      formData,
      zfd.formData({
        name: zfd.text(),
        description: zfd.text(),
        finePrint: zfd.text().optional(),
        offerType: z.enum(["voucher"]).default("voucher"),
        offerValue: zfd
          .numeric(z.number().positive())
          .transform((value) => value.toString()),
        applyOnPassCreation: zfd.checkbox(),
      })
    );
  } catch (err) {
    if (err === isZodError(err)) {
      return { status: "error", message: "Error validating input" };
    }
    console.error("Error creating offer", err);
    return { status: "error", message: "Unknown error occurred" };
  }

  try {
    await admin.offers.createBrandPassOffer(brandSlug, data);
    return { status: "success", message: "Offer created successfully!" };
  } catch (err) {
    console.error("Error creating offer", err);
    if (err === isPostgresError) {
      return { status: "error", message: "Error creating offer" };
    }
    return { status: "error", message: "Unknown error occurred" };
  }
}
