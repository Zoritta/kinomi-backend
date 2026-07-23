import { z, registry } from '../../lib/zod-openapi';
import {
  LookingFor,
  SmokingPreference,
  PetPreference,
  Cleanliness,
  ScheduleType,
  SocialEnergy,
  HousingStatus,
  HousingPreference,
} from '../../generated/prisma/enums';

export const profileSchema = registry.register(
  'ProfileRequest',
  z.object({
    displayName: z.string().min(1).max(80),
    bio: z.string().max(1000).optional(),

    lookingFor: z.array(z.enum(LookingFor)).optional(),
    smokingPreference: z.enum(SmokingPreference).optional(),
    petPreference: z.enum(PetPreference).optional(),
    cleanliness: z.enum(Cleanliness).optional(),
    scheduleType: z.enum(ScheduleType).optional(),
    socialEnergy: z.enum(SocialEnergy).optional(),
    housingStatus: z.enum(HousingStatus).optional(),
    housingPreference: z.enum(HousingPreference).optional(),

    languages: z.array(z.string()).optional(),
    interests: z.array(z.string()).optional(),
  }),
);

export type ProfileInput = z.infer<typeof profileSchema>;

export const updateProfileSchema = registry.register('ProfileUpdateRequest', profileSchema.partial());

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const profileResponseSchema = registry.register(
  'Profile',
  z.object({
    id: z.string(),
    userId: z.string(),
    displayName: z.string(),
    bio: z.string().nullable(),

    lookingFor: z.array(z.enum(LookingFor)),
    smokingPreference: z.enum(SmokingPreference).nullable(),
    petPreference: z.enum(PetPreference).nullable(),
    cleanliness: z.enum(Cleanliness).nullable(),
    scheduleType: z.enum(ScheduleType).nullable(),
    socialEnergy: z.enum(SocialEnergy).nullable(),
    housingStatus: z.enum(HousingStatus).nullable(),
    housingPreference: z.enum(HousingPreference).nullable(),

    languages: z.array(z.string()),
    interests: z.array(z.string()),

    createdAt: z.string(),
    updatedAt: z.string(),
  }),
);
