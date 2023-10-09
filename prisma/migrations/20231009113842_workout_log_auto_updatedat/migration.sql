/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `WorkoutLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkoutLog" DROP COLUMN "updatedAt",
ADD COLUMN     "date_updated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
