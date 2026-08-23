"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.logout = logout;
exports.me = me;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_js_1 = require("../models/Admin.js");
const index_js_1 = require("../validators/index.js");
const apiResponse_js_1 = require("../utils/apiResponse.js");
const errorHandler_js_1 = require("../middleware/errorHandler.js");
const env_js_1 = require("../config/env.js");
async function login(req, res, next) {
    try {
        const { email, password } = index_js_1.loginSchema.parse(req.body);
        const admin = await Admin_js_1.Admin.findOne({ email: email.toLowerCase() });
        if (!admin || !admin.active) {
            throw new errorHandler_js_1.AppError('Invalid credentials', 401);
        }
        const valid = await bcryptjs_1.default.compare(password, admin.passwordHash);
        if (!valid) {
            throw new errorHandler_js_1.AppError('Invalid credentials', 401);
        }
        admin.lastLogin = new Date();
        await admin.save();
        const token = jsonwebtoken_1.default.sign({ id: admin._id, role: admin.role }, env_js_1.env.JWT_SECRET, { expiresIn: env_js_1.env.JWT_EXPIRES_IN });
        res.cookie('token', token, {
            httpOnly: true,
            secure: env_js_1.isProduction,
            sameSite: env_js_1.isProduction ? 'strict' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return (0, apiResponse_js_1.successResponse)(res, {
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        }, 'Login successful');
    }
    catch (error) {
        next(error);
    }
}
async function logout(_req, res) {
    res.clearCookie('token');
    return (0, apiResponse_js_1.successResponse)(res, null, 'Logged out successfully');
}
async function me(req, res, next) {
    try {
        if (!req.admin) {
            throw new errorHandler_js_1.AppError('Not authenticated', 401);
        }
        return (0, apiResponse_js_1.successResponse)(res, {
            admin: {
                id: req.admin._id,
                name: req.admin.name,
                email: req.admin.email,
                role: req.admin.role,
            },
        });
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=authController.js.map