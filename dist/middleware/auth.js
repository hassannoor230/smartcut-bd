"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
exports.requireRole = requireRole;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_js_1 = require("../config/env.js");
const Admin_js_1 = require("../models/Admin.js");
const errorHandler_js_1 = require("./errorHandler.js");
async function requireAuth(req, _res, next) {
    try {
        const token = req.cookies?.token ||
            (req.headers.authorization?.startsWith('Bearer ')
                ? req.headers.authorization.split(' ')[1]
                : null);
        if (!token) {
            throw new errorHandler_js_1.AppError('Authentication required', 401);
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_js_1.env.JWT_SECRET);
        const admin = await Admin_js_1.Admin.findById(decoded.id).select('-passwordHash');
        if (!admin || !admin.active) {
            throw new errorHandler_js_1.AppError('Invalid or inactive account', 401);
        }
        req.admin = admin;
        next();
    }
    catch (error) {
        next(error);
    }
}
function requireRole(...roles) {
    return (req, _res, next) => {
        if (!req.admin || !roles.includes(req.admin.role)) {
            return next(new errorHandler_js_1.AppError('Insufficient permissions', 403));
        }
        next();
    };
}
//# sourceMappingURL=auth.js.map