"use server";

import { admin, superadmin } from "@danklabs/cake/services/admin-service";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";
import { FormState } from "@danklabs/pattern-library/core";

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
  await admin.brand.createBrandOfferCodes(templateId, codes);
}

export async function addBrandAction(formData: FormData) {
  const form = Object.fromEntries(formData.entries());
  const addBrandSchema = z.object({
    slug: z.string(),
  });
  const data = addBrandSchema.parse(form);
  console.log("addBrandAction", data);

  await admin.brand.addBrand(data.slug);

  redirect(`/admin/brands/${data.slug}`);
}

export async function updateBrandStatusAction(
  slug: string,
  newStatus: "active" | "draft" | "paused" | "deactivated"
) {
  await superadmin.updateBrandStatus(slug, newStatus);
}

export async function addManagerAction(
  brandSlug: string,
  state: FormState,
  data: FormData
): Promise<FormState> {
  const form = Object.fromEntries(data.entries());
  const addManagerSchema = z.object({
    email: z.string().email(),
  });
  const parsed = addManagerSchema.parse(form);
  await admin.brand.addManager(brandSlug, parsed.email);

  return state;
}
