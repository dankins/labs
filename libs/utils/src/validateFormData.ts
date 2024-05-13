import { ZodTypeAny, infer as zInfer } from "zod";
import { FormError } from "./types";
import { isZodError } from "./isZodError";
export function validateFormData<T extends ZodTypeAny>(
  formData: FormData,
  schema: T
): zInfer<T> {
  const form = Object.fromEntries(formData.entries());
  return schema.parse(form);
}

export function validateFormHelper<T extends ZodTypeAny>(
  formData: FormData,
  schema: Parameters<typeof validateFormData>[1]
): [zInfer<T>, undefined] | [undefined, FormError] {
  try {
    const data = validateFormData(formData, schema);
    return [data, undefined];
  } catch (err) {
    if (isZodError(err)) {
      const fieldErrors: { [key: string]: { message: string } } = {};
      err.errors.forEach((error) => {
        fieldErrors[error.path.join("|")] = { message: error.message };
      });
      return [
        undefined,
        { status: "error", message: "Error validating input", fieldErrors },
      ];
    }
    return [undefined, { status: "error", message: "Error validating input" }];
  }
}
