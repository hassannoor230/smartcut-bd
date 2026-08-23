import dotenv from 'dotenv';
dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  MONGODB_URI: process.env.MONGODB_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-change-me',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  SERVER_URL: process.env.SERVER_URL || 'http://localhost:5000',
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || '',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || '',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'cookie-secret-change-me',
};

export const isProduction = env.NODE_ENV === 'production';

/**
 * Validate critical environment variables for production
 * In production, JWT_SECRET must be explicitly set (not using default)
 * This prevents 401 authentication failures due to mismatched secrets
 */
export function validateAuthConfig() {
  if (isProduction) {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'dev-secret-change-me') {
      throw new Error(
        'CRITICAL: JWT_SECRET not properly configured in production. ' +
        'Set JWT_SECRET in Vercel Environment Variables. ' +
        'Use: openssl rand -hex 32'
      );
    }
    if (!process.env.COOKIE_SECRET || process.env.COOKIE_SECRET === 'cookie-secret-change-me') {
      throw new Error(
        'CRITICAL: COOKIE_SECRET not properly configured in production. ' +
        'Set COOKIE_SECRET in Vercel Environment Variables. ' +
        'Use: openssl rand -hex 16'
      );
    }
  }
}
