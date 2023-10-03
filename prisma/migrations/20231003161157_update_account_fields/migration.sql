/*
  Warnings:

  - A unique constraint covering the columns `[providerType,providerId,providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Account_providerId_providerAccountId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerType_providerId_providerAccountId_key" ON "Account"("providerType", "providerId", "providerAccountId");
