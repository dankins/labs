import { ZodError } from "zod";

// Type guard function to check if an error is a ZodError
export function isZodError(error: any): error is ZodError {
  return error instanceof ZodError;
}
