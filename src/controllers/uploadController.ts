import { Response, NextFunction } from 'express';
import multer from 'multer';
import { uploadImage, isCloudinaryConfigured } from '../services/cloudinary.js';
import { successResponse } from '../utils/apiResponse.js';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  },
});

export const uploadReceipt = upload.single('receipt');

export async function handleUploadReceipt(req: any, res: Response, next: NextFunction) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    if (!isCloudinaryConfigured) {
      return res.status(500).json({ success: false, message: 'File upload not configured' });
    }

    const result = await uploadImage(req.file.buffer, 'smartcut/receipts');

    if (!result) {
      return res.status(500).json({ success: false, message: 'Upload failed' });
    }

    return successResponse(res, { url: result.url, publicId: result.publicId });
  } catch (error) {
    next(error);
  }
}
