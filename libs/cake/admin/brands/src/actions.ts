"use server";

import {
  createBrandOfferCodes,
  createBrandPassOffer,
} from "@danklabs/cake/services/admin-service";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createOffer(brandSlug: string, brandId: string) {
  console.log("create offer", brandId);
  await createBrandPassOffer(brandId, true);
  revalidatePath(`/admin/brands/${brandSlug}/`);
}

export async function createCodes(
  brandSlug: string,
  templateId: string,
  formData: FormData
) {
  const form = Object.fromEntries(formData.entries());
  const codesSchema = z.object({
    codes: z.string(),
  });
  const data = codesSchema.parse(form);
  const codes = data.codes.split(/\r?\n|\r|\n/g);
  await createBrandOfferCodes(templateId, codes);
  revalidatePath(`/admin/brands/${brandSlug}/offers/${templateId}`);
}
