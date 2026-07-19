/// <reference path="./types/express.d.ts" />
import express from 'express';
import prisma from './lib/prisma';
import authRoutes from './modules/auth/auth.routes';
import { errorHandler } from './middleware/error-handler';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/health/db', async (_req, res) => {
  const userCount = await prisma.user.count();
  res.json({ status: 'ok', userCount });
});

app.use('/api/auth', authRoutes);

app.use(errorHandler);

export default app;
