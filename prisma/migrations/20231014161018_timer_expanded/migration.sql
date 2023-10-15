/*
  Warnings:

  - Added the required column `status` to the `Timer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TimerStatus" AS ENUM ('RUNNING', 'PAUSED', 'STOPPED');

-- AlterTable
ALTER TABLE "Timer" ADD COLUMN     "pauseTime" TIMESTAMP(3),
ADD COLUMN     "pausedDuration" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "TimerStatus" NOT NULL;
