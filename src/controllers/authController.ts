import { Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { AuthRequest } from '../middleware/auth.js';
import { Admin } from '../models/Admin.js';
import { loginSchema } from '../validators/index.js';
import { successResponse } from '../utils/apiResponse.js';
import { AppError } from '../middleware/errorHandler.js';
import { env, isProduction } from '../config/env.js';

/**
 * Admin Login Endpoint
 * 
 * Flow:
 * 1. Validate email and password with Zod schema
 * 2. Find admin by email (case-insensitive)
 * 3. Compare password with bcrypt hash
 * 4. Sign JWT with admin ID and role
 * 5. Set HttpOnly cookie with JWT
 * 6. Return admin info (NO token in response)
 * 
 * HttpOnly Cookie Authentication:
 * - Token is stored in HttpOnly cookie (inaccessible to JavaScript)
 * - Browser automatically sends cookie with credentials: true
 * - Protected routes extract token from cookie in auth middleware
 * - Cookie settings:
 *   - httpOnly: true (security - prevent XSS)
 *   - secure: true (production only - HTTPS required)
 *   - sameSite: 'none' (production only - allow cross-domain)
 *   - maxAge: 7 days
 * 
 * CRITICAL: JWT_SECRET must be configured in production (Vercel)
 * If JWT_SECRET is not set, token verification will fail → 401
 */
export async function login(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !admin.active) {
      throw new AppError('Invalid credentials', 401);
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      throw new AppError('Invalid credentials', 401);
    }

    admin.lastLogin = new Date();
    await admin.save();

    const signOptions: SignOptions = {
      expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
    };

    // Sign JWT with admin ID and role
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      env.JWT_SECRET,
      signOptions
    );

    // Set HttpOnly cookie with JWT
    // Browser will automatically send this cookie with requests
    res.cookie('token', token, {
      httpOnly: true,              // Prevent access from JavaScript (security)
      secure: isProduction,         // HTTPS only in production
      sameSite: isProduction ? 'none' : 'lax', // Cross-domain cookies in production
      path: '/',                    // CRITICAL: make cookie available to all routes
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return successResponse(res, {
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    }, 'Login successful');
  } catch (error) {
    next(error);
  }
}

/**
 * Admin Logout Endpoint
 * Clears the authentication cookie
 */
export async function logout(_req: AuthRequest, res: Response) {
  res.clearCookie('token', { path: '/' });
  return successResponse(res, null, 'Logged out successfully');
}

/**
 * Get Current Admin Endpoint
 * Returns authenticated admin info from req.admin (set by requireAuth middleware)
 * 
 * This endpoint tests whether authentication is working correctly.
 * If it returns 401, the issue is in the authentication middleware or
 * the JWT_SECRET configuration (mismatch or missing in production).
 */
export async function me(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.admin) {
      throw new AppError('Not authenticated', 401);
    }
    return successResponse(res, {
      admin: {
        id: req.admin._id,
        name: req.admin.name,
        email: req.admin.email,
        role: req.admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
}
