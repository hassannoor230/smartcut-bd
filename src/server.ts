import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';

async function start() {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
