import { z } from "zod";
export interface ValidationResult<T> {
    err: boolean;
    val: T | string;
}
export declare function validateArbitratyData<T>(data: unknown, schema: z.ZodSchema<T>): ValidationResult<T>;
//# sourceMappingURL=sanitization.d.ts.map