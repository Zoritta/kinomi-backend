/// <reference path="./types/express.d.ts" />
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import prisma from './lib/prisma';
import authRoutes from './modules/auth/auth.routes';
import profileRoutes from './modules/profiles/profiles.routes';
import { errorHandler } from './middleware/error-handler';
import { generateOpenApiDocument } from './openapi/generate-document';

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
app.use('/api/profiles', profileRoutes);

const openApiDocument = generateOpenApiDocument();

app.get('/api/openapi.json', (_req, res) => {
  res.json(openApiDocument);
});

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.use(errorHandler);

export default app;
