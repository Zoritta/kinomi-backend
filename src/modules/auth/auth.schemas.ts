import { z, registry } from '../../lib/zod-openapi';

export const signupSchema = registry.register(
  'SignupRequest',
  z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
);

export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = registry.register(
  'LoginRequest',
  z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Password is required'),
  }),
);

export type LoginInput = z.infer<typeof loginSchema>;

export const userSchema = registry.register(
  'User',
  z.object({
    id: z.string(),
    email: z.string().email(),
  }),
);

export const authResponseSchema = registry.register(
  'AuthResponse',
  z.object({
    user: userSchema,
    accessToken: z.string(),
  }),
);
