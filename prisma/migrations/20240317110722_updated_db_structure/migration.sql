/*
  Warnings:

  - You are about to drop the column `featuredNFTCollectionId` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `attributes` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `featuredNFTCollectionId` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `tokenID` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `trendingNFTCollectionId` on the `NFT` table. All the data in the column will be lost.
  - You are about to drop the column `uploadedAt` on the `NFT` table. All the data in the column will be lost.
  - Added the required column `image` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collectionId` to the `FeaturedNFTCollection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metadata` to the `NFT` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_featuredNFTCollectionId_fkey";

-- DropForeignKey
ALTER TABLE "NFT" DROP CONSTRAINT "NFT_featuredNFTCollectionId_fkey";

-- DropForeignKey
ALTER TABLE "NFT" DROP CONSTRAINT "NFT_trendingNFTCollectionId_fkey";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "featuredNFTCollectionId",
DROP COLUMN "position",
DROP COLUMN "rank",
ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FeaturedNFTCollection" ADD COLUMN     "collectionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "NFT" DROP COLUMN "attributes",
DROP COLUMN "description",
DROP COLUMN "featuredNFTCollectionId",
DROP COLUMN "hash",
DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "tokenID",
DROP COLUMN "trendingNFTCollectionId",
DROP COLUMN "uploadedAt",
ADD COLUMN     "metadata" JSONB NOT NULL;

-- AddForeignKey
ALTER TABLE "FeaturedNFTCollection" ADD CONSTRAINT "FeaturedNFTCollection_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
