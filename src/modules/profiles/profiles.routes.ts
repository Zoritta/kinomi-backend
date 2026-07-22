import { Router } from 'express';
import { requireAuth } from '../../middleware/require-auth';
import { validateRequest } from '../../middleware/validate-request';
import { profileSchema, updateProfileSchema } from './profiles.schemas';
import * as profilesController from './profiles.controller';

const router = Router();

router.get('/me', requireAuth, profilesController.getMe);
router.put('/me', requireAuth, validateRequest(profileSchema), profilesController.upsertMe);
router.patch('/me', requireAuth, validateRequest(updateProfileSchema), profilesController.patchMe);

export default router;
