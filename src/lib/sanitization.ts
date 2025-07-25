import { z } from "zod";

export interface ValidationResult<T> {
  err: boolean;
  val: T | string;
}

export function validateArbitratyData<T>(
  data: unknown,
  schema: z.ZodSchema<T>
): ValidationResult<T> {
  try {
    const result = schema.parse(data);
    return { err: false, val: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { err: true, val: error.errors.map(e => e.message).join(", ") };
    }
    return { err: true, val: "Validation failed" };
  }
}