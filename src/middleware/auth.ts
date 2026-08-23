import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { Admin, IAdmin } from '../models/Admin.js';
import { AppError } from './errorHandler.js';

export interface AuthRequest extends Request {
  admin?: IAdmin;
}

interface JwtPayload {
  id: string;
  role: string;
}

export async function requireAuth(req: AuthRequest, _res: Response, next: NextFunction) {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null);

    if (!token) {
      throw new AppError('Authentication required', 401);
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    const admin = await Admin.findById(decoded.id).select('-passwordHash');

    if (!admin || !admin.active) {
      throw new AppError('Invalid or inactive account', 401);
    }

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
