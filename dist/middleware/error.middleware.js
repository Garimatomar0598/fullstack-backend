"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const library_1 = require("@prisma/client/runtime/library");
const errorHandler = (err, req, res, next) => {
    var _a;
    console.error('Error:', err);
    // Handle Zod validation errors
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            message: 'Validation error',
            errors: err.errors,
        });
    }
    // Handle Prisma errors
    if (err instanceof library_1.PrismaClientKnownRequestError) {
        // Handle unique constraint violations
        if (err.code === 'P2002') {
            return res.status(400).json({
                message: `A ${(_a = err.meta) === null || _a === void 0 ? void 0 : _a.target} with this value already exists`,
            });
        }
        // Handle record not found
        if (err.code === 'P2001') {
            return res.status(404).json({ message: 'Record not found' });
        }
    }
    // Handle other errors
    return res.status(500).json({
        message: err.message || 'Internal Server Error',
    });
};
exports.errorHandler = errorHandler;
