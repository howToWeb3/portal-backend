import ErrorResponse from '../../helpers/errorResponse.js';
import prisma from '../../helpers/prismaClient.js';

export default async function addFeaturedCollection(req, res) {
    const resObj = { success: false, error: false, message: '', data: {} };

    try {
        const { collectionId, rank } = req.body;

        // Check if the collectionId and rank are provided
        if (!collectionId || !rank) {
            resObj.error = true;
            resObj.message = 'Please provide collectionId and rank';
            return res.status(400).json(resObj);
        }

        // Check if the collection exists
        const collection = await prisma.collection.findUnique({
            where: { id: collectionId },
        });

        if (!collection) {
            resObj.error = true;
            resObj.message = 'Collection not found';
            return res.status(404).json(resObj);
        }

        // Create a new featured collection
        const featuredCollection = await prisma.featuredNFTCollection.create({
            data: {
                collectionId,
                rank,
                collection: {
                    connect: { id: collectionId },
                },
            },
        });

        resObj.success = true;
        resObj.data = featuredCollection;

        return res.status(200).json(resObj);
    } catch (error) {
        return ErrorResponse(res, error.message);
    }
}
