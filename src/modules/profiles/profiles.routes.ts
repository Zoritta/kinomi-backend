import { Router } from 'express';
import { requireAuth } from '../../middleware/require-auth';
import { validateRequest } from '../../middleware/validate-request';
import { z, registry, errorResponseSchema } from '../../lib/zod-openapi';
import { profileSchema, updateProfileSchema, profileResponseSchema } from './profiles.schemas';
import * as profilesController from './profiles.controller';

const router = Router();

registry.registerPath({
  method: 'get',
  path: '/api/profiles/me',
  tags: ['Profiles'],
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Your profile',
      content: { 'application/json': { schema: z.object({ profile: profileResponseSchema }) } },
    },
    404: {
      description: 'Profile not created yet',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
    401: {
      description: 'Not authenticated',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
  },
});
router.get('/me', requireAuth, profilesController.getMe);

registry.registerPath({
  method: 'put',
  path: '/api/profiles/me',
  tags: ['Profiles'],
  security: [{ bearerAuth: [] }],
  request: {
    body: { content: { 'application/json': { schema: profileSchema } } },
  },
  responses: {
    200: {
      description: 'Profile created or replaced',
      content: { 'application/json': { schema: z.object({ profile: profileResponseSchema }) } },
    },
    400: {
      description: 'Validation error',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
    401: {
      description: 'Not authenticated',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
  },
});
router.put('/me', requireAuth, validateRequest(profileSchema), profilesController.upsertMe);

registry.registerPath({
  method: 'patch',
  path: '/api/profiles/me',
  tags: ['Profiles'],
  security: [{ bearerAuth: [] }],
  request: {
    body: { content: { 'application/json': { schema: updateProfileSchema } } },
  },
  responses: {
    200: {
      description: 'Profile updated',
      content: { 'application/json': { schema: z.object({ profile: profileResponseSchema }) } },
    },
    404: {
      description: 'Profile not created yet',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
    400: {
      description: 'Validation error',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
    401: {
      description: 'Not authenticated',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
  },
});
router.patch('/me', requireAuth, validateRequest(updateProfileSchema), profilesController.patchMe);

export default router;
