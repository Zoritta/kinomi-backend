import prisma from '../../lib/prisma';
import { HttpError } from '../../errors/http-error';
import type { ProfileInput, UpdateProfileInput } from './profiles.schemas';

export async function getOwnProfile(userId: string) {
  const profile = await prisma.profile.findUnique({ where: { userId } });
  if (!profile) {
    throw new HttpError(404, 'Profile not found');
  }
  return profile;
}

export async function upsertOwnProfile(userId: string, input: ProfileInput) {
  return prisma.profile.upsert({
    where: { userId },
    create: { userId, ...input },
    update: { ...input },
  });
}

export async function updateOwnProfile(userId: string, input: UpdateProfileInput) {
  const existing = await prisma.profile.findUnique({ where: { userId } });
  if (!existing) {
    throw new HttpError(404, 'Profile not found — create one first');
  }

  return prisma.profile.update({ where: { userId }, data: input });
}
