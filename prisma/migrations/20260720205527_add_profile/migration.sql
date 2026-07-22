-- CreateEnum
CREATE TYPE "LookingFor" AS ENUM ('CO_LIVING', 'SHARED_MEALS', 'WATCHING_TV', 'ACTIVITY_PARTNER', 'CONVERSATION');

-- CreateEnum
CREATE TYPE "SmokingPreference" AS ENUM ('SMOKER', 'NON_SMOKER', 'NO_PREFERENCE');

-- CreateEnum
CREATE TYPE "PetPreference" AS ENUM ('HAS_PETS', 'LIKES_PETS', 'NO_PETS', 'ALLERGIC');

-- CreateEnum
CREATE TYPE "Cleanliness" AS ENUM ('VERY_TIDY', 'TIDY', 'RELAXED');

-- CreateEnum
CREATE TYPE "ScheduleType" AS ENUM ('EARLY_BIRD', 'NIGHT_OWL', 'FLEXIBLE');

-- CreateEnum
CREATE TYPE "SocialEnergy" AS ENUM ('INTROVERT', 'AMBIVERT', 'EXTROVERT');

-- CreateEnum
CREATE TYPE "HousingStatus" AS ENUM ('HAS_PLACE', 'LOOKING_TOGETHER');

-- CreateEnum
CREATE TYPE "HousingPreference" AS ENUM ('RENT', 'OWN', 'NO_PREFERENCE');

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "bio" TEXT,
    "lookingFor" "LookingFor"[],
    "smokingPreference" "SmokingPreference",
    "petPreference" "PetPreference",
    "cleanliness" "Cleanliness",
    "scheduleType" "ScheduleType",
    "socialEnergy" "SocialEnergy",
    "housingStatus" "HousingStatus",
    "housingPreference" "HousingPreference",
    "languages" TEXT[],
    "interests" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
