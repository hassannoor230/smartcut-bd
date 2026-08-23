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
  if (!allowedOrigins.includes(env.CLIENT_URL)) {
    allowedOrigins.push(env.CLIENT_URL);
  }
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

// Root endpoint
app.get('/', (_req, res) => {
  return successResponse(res, {
    name: 'Smartcut Backend API',
    version: '1.0.0',
    status: 'online',
    api: '/api',
    health: '/api/health',
  }, 'Smartcut Backend API');
});

// Favicon - return 204 No Content to avoid 404s
app.get('/favicon.ico', (_req, res) => res.status(204).end());
app.get('/favicon.png', (_req, res) => res.status(204).end());

// 404 & Error
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
