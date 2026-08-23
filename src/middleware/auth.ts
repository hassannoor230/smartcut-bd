import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { env, isProduction } from '../config/env.js';
import { Admin, IAdmin } from '../models/Admin.js';
import { AppError } from './errorHandler.js';

export interface AuthRequest extends Request {
  admin?: IAdmin;
}

interface JwtPayload {
  id: string;
  role: string;
}

/**
 * Middleware to verify JWT from HttpOnly cookie or Authorization header.
 * Required for all protected admin endpoints.
 * 
 * Authentication flow:
 * 1. Extract token from req.cookies.token (HttpOnly) or Authorization header
 * 2. Verify JWT signature using env.JWT_SECRET
 * 3. Find admin by ID from token payload
 * 4. Ensure admin account is active
 * 5. Attach admin object to req.admin
 * 
 * Common 401 errors:
 * - No token found: Cookie/header missing or not sent by client
 * - JWT verification failed: JWT_SECRET mismatch or token expired
 * - Admin not found: User deleted or ID changed
 * - Inactive account: Admin marked as inactive
 */
export async function requireAuth(req: AuthRequest, _res: Response, next: NextFunction) {
  try {
    // Extract token from HttpOnly cookie (preferred) or Authorization header
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null);

    if (!token) {
      throw new AppError('Authentication required', 401);
    }

    // Verify JWT signature
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    } catch (error) {
      // Distinguish between different JWT errors for better debugging
      if (error instanceof TokenExpiredError) {
        throw new AppError('Token expired. Please login again', 401);
      }
      if (error instanceof JsonWebTokenError) {
        // In production, JWT_SECRET mismatch is a likely cause
        // This happens when JWT_SECRET is not set in Vercel environment
        if (isProduction) {
          console.error('[AUTH] JWT verification failed in production - JWT_SECRET may not be configured correctly');
        }
        throw new AppError('Invalid token', 401);
      }
      throw error;
    }

    // Find admin by ID from token payload
    const admin = await Admin.findById(decoded.id).select('-passwordHash');

    if (!admin) {
      throw new AppError('Admin account not found', 401);
    }

    if (!admin.active) {
      throw new AppError('Admin account is inactive', 401);
    }

    // Attach admin to request for use in controllers
    req.admin = admin;
    next();
  } catch (error) {
    next(error);
  }
}

export function requireRole(...roles: string[]) {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      return next(new AppError('Insufficient permissions', 403));
    }
    next();
  };
}
