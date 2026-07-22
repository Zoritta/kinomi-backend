import { z } from 'zod';
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

export const profileSchema = z.object({
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
});

export type ProfileInput = z.infer<typeof profileSchema>;

export const updateProfileSchema = profileSchema.partial();

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
