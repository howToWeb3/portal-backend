-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NFT" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "tokenID" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attributes" JSONB NOT NULL DEFAULT '[]',
    "tags" TEXT[],
    "ownerId" TEXT NOT NULL,
    "collectionId" INTEGER,
    "featuredNFTCollectionId" INTEGER,
    "trendingNFTCollectionId" INTEGER,

    CONSTRAINT "NFT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturedNFTCollection" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "FeaturedNFTCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrendingNFTCollection" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "TrendingNFTCollection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_featuredNFTCollectionId_fkey" FOREIGN KEY ("featuredNFTCollectionId") REFERENCES "FeaturedNFTCollection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_trendingNFTCollectionId_fkey" FOREIGN KEY ("trendingNFTCollectionId") REFERENCES "TrendingNFTCollection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
