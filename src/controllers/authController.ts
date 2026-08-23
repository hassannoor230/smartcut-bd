import { Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { AuthRequest } from '../middleware/auth.js';
import { Admin } from '../models/Admin.js';
import { loginSchema } from '../validators/index.js';
import { successResponse } from '../utils/apiResponse.js';
import { AppError } from '../middleware/errorHandler.js';
import { env, isProduction } from '../config/env.js';

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

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN } as SignOptions
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
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

export async function logout(_req: AuthRequest, res: Response) {
  res.clearCookie('token');
  return successResponse(res, null, 'Logged out successfully');
}

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
