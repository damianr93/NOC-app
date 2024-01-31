/*
  Warnings:

  - You are about to drop the column `createdAt` on the `logModel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "logModel" DROP COLUMN "createdAt",
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
