/*
  Warnings:

  - Added the required column `description` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `FeaturedNFTCollection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `TrendingNFTCollection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "featuredNFTCollectionId" INTEGER,
ADD COLUMN     "position" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rank" INTEGER NOT NULL,
ADD COLUMN     "trendingNFTCollectionId" INTEGER;

-- AlterTable
ALTER TABLE "FeaturedNFTCollection" ADD COLUMN     "rank" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "NFT" ADD COLUMN     "tx" JSONB,
ALTER COLUMN "attributes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TrendingNFTCollection" ADD COLUMN     "rank" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_featuredNFTCollectionId_fkey" FOREIGN KEY ("featuredNFTCollectionId") REFERENCES "FeaturedNFTCollection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_trendingNFTCollectionId_fkey" FOREIGN KEY ("trendingNFTCollectionId") REFERENCES "TrendingNFTCollection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
