import ErrorResponse from '../../helpers/errorResponse.js';
import prisma from '../../helpers/prismaClient.js';

export default async function fetchNfts(req, res) {
    try {
        // Get pagination parameters from the request query
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        const name = req.query.name;

        if (!name) {
            return ErrorResponse(res, 'Please provide a valid NFT name');
        }

        // include owner and collection details in the response
        const nfts = await prisma.nFT.findMany({
            select: {
                id: true,
                metadata: true,
                tags: true,
                tx: true,
                name: true,
                description: true,
                image: true,
                owner: true,
                collectionId: true,
                Collection: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        image: true,
                    },
                },
            },
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
            },
            skip,
            take: limit,
            orderBy: {
                id: 'asc',
            },
        });

        // Count the total number of NFTs with the given name
        const totalNfts = await prisma.nFT.count({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
            },
        });

        // Calculate pagination metadata
        const totalPages = Math.ceil(totalNfts / limit);
        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        return res.status(200).json({
            success: true,
            data: {
                totalNfts: totalNfts,
                nfts,
                pagination: {
                    current_page: page,
                    total_pages: totalPages,
                    next_page: nextPage,
                    prev_page: prevPage,
                },
            },
        });
    } catch (error) {
        return ErrorResponse(res, error.message);
    }
}
