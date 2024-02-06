import { ZodTypeAny, infer as zInfer } from "zod";
export function validateFormData<T extends ZodTypeAny>(
  formData: FormData,
  schema: T
): zInfer<T> {
  const form = Object.fromEntries(formData.entries());
  return schema.parse(form);
}
