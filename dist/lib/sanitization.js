"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateArbitratyData = validateArbitratyData;
const zod_1 = require("zod");
function validateArbitratyData(data, schema) {
    try {
        const result = schema.parse(data);
        return { err: false, val: result };
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return { err: true, val: error.errors.map(e => e.message).join(", ") };
        }
        return { err: true, val: "Validation failed" };
    }
}
//# sourceMappingURL=sanitization.js.map