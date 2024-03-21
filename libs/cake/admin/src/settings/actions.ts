"use server";

import { z } from "zod";
import { validateFormData } from "@danklabs/utils";
import { superadmin } from "@danklabs/cake/services/admin-service";

export async function addSuperAdminAction(formData: FormData) {
  const data = validateFormData(
    formData,
    z.object({ email: z.string().email() })
  );
  return superadmin.addSuperAdmin(data.email);
}
