import express from 'express';
import prisma from './lib/prisma';

const app = express();

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/health/db', async (_req, res) => {
  const userCount = await prisma.user.count();
  res.json({ status: 'ok', userCount });
});

export default app;
