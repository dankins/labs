"use server";

import {
  addBrand,
  createBrandOfferCodes,
  createBrandPassOffer,
  superadmin,
} from "@danklabs/cake/services/admin-service";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";
import type { brandStatus } from "@danklabs/cake/db";

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

export async function addBrandAction(formData: FormData) {
  const form = Object.fromEntries(formData.entries());
  const addBrandSchema = z.object({
    slug: z.string(),
  });
  const data = addBrandSchema.parse(form);
  console.log("addBrandAction", data);

  await addBrand(data.slug);

  redirect(`/admin/brands/${data.slug}`);
}

export async function updateBrandStatusAction(
  slug: string,
  newStatus: "active" | "draft" | "paused" | "deactivated"
) {
  await superadmin.updateBrandStatus(slug, newStatus);
}
