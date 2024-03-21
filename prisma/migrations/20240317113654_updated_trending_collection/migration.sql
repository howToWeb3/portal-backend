/*
  Warnings:

  - You are about to drop the column `trendingNFTCollectionId` on the `Collection` table. All the data in the column will be lost.
  - Added the required column `collectionId` to the `TrendingNFTCollection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_trendingNFTCollectionId_fkey";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "trendingNFTCollectionId";

-- AlterTable
ALTER TABLE "TrendingNFTCollection" ADD COLUMN     "collectionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TrendingNFTCollection" ADD CONSTRAINT "TrendingNFTCollection_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
