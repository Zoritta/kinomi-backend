import { Router } from 'express';
import { validateRequest } from '../../middleware/validate-request';
import { requireAuth } from '../../middleware/require-auth';
import { signupSchema, loginSchema } from './auth.schemas';
import * as authController from './auth.controller';

const router = Router();

router.post('/signup', validateRequest(signupSchema), authController.signup);
router.post('/login', validateRequest(loginSchema), authController.login);
router.get('/me', requireAuth, authController.me);

export default router;
