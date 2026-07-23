import { Router } from 'express';
import { validateRequest } from '../../middleware/validate-request';
import { requireAuth } from '../../middleware/require-auth';
import { z, registry, errorResponseSchema } from '../../lib/zod-openapi';
import { signupSchema, loginSchema, authResponseSchema, userSchema } from './auth.schemas';
import * as authController from './auth.controller';

const router = Router();

registry.registerPath({
  method: 'post',
  path: '/api/auth/signup',
  tags: ['Auth'],
  request: {
    body: { content: { 'application/json': { schema: signupSchema } } },
  },
  responses: {
    201: {
      description: 'Account created',
      content: { 'application/json': { schema: authResponseSchema } },
    },
    409: {
      description: 'Email already in use',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
    400: {
      description: 'Validation error',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
  },
});
router.post('/signup', validateRequest(signupSchema), authController.signup);

registry.registerPath({
  method: 'post',
  path: '/api/auth/login',
  tags: ['Auth'],
  request: {
    body: { content: { 'application/json': { schema: loginSchema } } },
  },
  responses: {
    200: {
      description: 'Logged in',
      content: { 'application/json': { schema: authResponseSchema } },
    },
    401: {
      description: 'Invalid credentials',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
    400: {
      description: 'Validation error',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
  },
});
router.post('/login', validateRequest(loginSchema), authController.login);

registry.registerPath({
  method: 'get',
  path: '/api/auth/me',
  tags: ['Auth'],
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Current user',
      content: { 'application/json': { schema: z.object({ user: userSchema }) } },
    },
    401: {
      description: 'Not authenticated',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
  },
});
router.get('/me', requireAuth, authController.me);

export default router;
