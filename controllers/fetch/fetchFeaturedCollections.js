import ErrorResponse from '../../helpers/errorResponse.js';
import prismaClient from '../../helpers/prismaClient.js';

export default async function fetchFeaturedCollections(req, res) {
    const resObj = { success: false, error: false, message: '', data: {} };

    try {
        // Get pagination parameters from the request query
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        // Fetch featured NFTs from Prisma database with pagination
        const featuredNftsCount = await prismaClient.featuredNFTCollection.count();

        const featuredNfts = await prismaClient.featuredNFTCollection.findMany({
            include: {
                collection: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        image: true,
                        owner: {
                            select: {
                                address: true,
                            },
                        },
                    },
                },
            },
            skip,
            take: limit,
            orderBy: {
                rank: 'asc',
            },
        });

        const modifiedFeaturedNfts = featuredNfts.map(({ id, rank, collection }) => ({
            id,
            rank,
            collectionId: collection.id,
            ...collection,
        }));

        // Calculate pagination metadata
        const totalPages = Math.ceil(featuredNftsCount / limit);
        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        resObj.success = true;
        resObj.data = {
            nfts: modifiedFeaturedNfts,
            pagination: {
                current_page: page,
                total_pages: totalPages,
                next_page: nextPage,
                prev_page: prevPage,
            },
        };

        return res.status(200).json(resObj);
    } catch (error) {
        return ErrorResponse(res, error.message);
    }
}
