import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import { env, isProduction } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { successResponse } from './utils/apiResponse.js';

const app = express();

const clientDistPath = (() => {
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, 'client', 'dist'),
    path.join(cwd, '..', 'client', 'dist'),
  ];
  for (const candidate of candidates) {
    try {
      if (fs.existsSync(path.join(candidate, 'index.html'))) {
        return candidate;
      }
    } catch {}
  }
  return candidates[0];
})();

// Security
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:4173',
];

if (env.CLIENT_URL) {
  env.CLIENT_URL.split(',').forEach((origin) => {
    const normalized = origin.trim().replace(/\/$/, '');
    if (normalized && !allowedOrigins.includes(normalized)) {
      allowedOrigins.push(normalized);
    }
  });
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(env.COOKIE_SECRET));
app.use(mongoSanitize());

// Routes
app.use('/api', routes);

// Serve client static files
app.use(express.static(clientDistPath));

app.get('/favicon.ico', (_req, res) => res.redirect('/favicon.svg'));
app.get('/favicon.png', (_req, res) => res.redirect('/favicon.svg'));

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'Not Found' });
  }
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

export default app;
