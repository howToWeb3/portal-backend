/*
  Warnings:

  - You are about to drop the column `createdAt` on the `NFT` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NFT" DROP COLUMN "createdAt",
ADD COLUMN     "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "hash" DROP NOT NULL,
ALTER COLUMN "tokenID" DROP NOT NULL;
