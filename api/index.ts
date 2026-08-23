import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

export default async function handler(req: Parameters<typeof app>[0], res: Parameters<typeof app>[1]) {
  const path = req.url?.split('?')[0];
  if (path === '/api' || path === '/api/' || path === '/api/health') {
    return app(req, res);
  }

  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return res.status(500).json({
      success: false,
      message: 'Database connection failed',
    });
  }
}
