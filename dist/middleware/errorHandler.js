"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
exports.errorHandler = errorHandler;
exports.notFoundHandler = notFoundHandler;
const zod_1 = require("zod");
const apiResponse_js_1 = require("../utils/apiResponse.js");
const env_js_1 = require("../config/env.js");
class AppError extends Error {
    statusCode;
    isOperational;
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
    }
}
exports.AppError = AppError;
function errorHandler(err, _req, res, _next) {
    if (err instanceof AppError) {
        return (0, apiResponse_js_1.errorResponse)(res, err.message, err.statusCode);
    }
    if (err instanceof zod_1.ZodError) {
        const errors = err.errors.map((e) => ({
            path: e.path.join('.'),
            message: e.message,
        }));
        return (0, apiResponse_js_1.errorResponse)(res, 'Validation failed', 400, errors);
    }
    if (err.name === 'ValidationError') {
        return (0, apiResponse_js_1.errorResponse)(res, err.message, 400);
    }
    if (err.name === 'CastError') {
        return (0, apiResponse_js_1.errorResponse)(res, 'Invalid ID format', 400);
    }
    if (err.code === 11000) {
        return (0, apiResponse_js_1.errorResponse)(res, 'Duplicate entry', 409);
    }
    if (err.name === 'JsonWebTokenError') {
        return (0, apiResponse_js_1.errorResponse)(res, 'Invalid token', 401);
    }
    if (err.name === 'TokenExpiredError') {
        return (0, apiResponse_js_1.errorResponse)(res, 'Token expired', 401);
    }
    console.error('Unhandled error:', err);
    const message = env_js_1.isProduction ? 'Something went wrong. Please try again.' : err.message;
    return (0, apiResponse_js_1.errorResponse)(res, message, 500);
}
function notFoundHandler(_req, res) {
    return (0, apiResponse_js_1.errorResponse)(res, 'Route not found', 404);
}
//# sourceMappingURL=errorHandler.js.map