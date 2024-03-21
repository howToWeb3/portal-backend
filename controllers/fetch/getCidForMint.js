import ErrorResponse from '../../helpers/errorResponse.js';
import fs from 'fs';
import { File, NFTStorage } from 'nft.storage';

export default async function getCidForMint(req, res) {
    try {
        const resObj = {
            success: false,
            error: false,
            message: '',
            data: {},
        };

        const { body } = req;
        const { name, description, taxon, address, transferFee, attributes } = body;
        const file = req.file;

        if (!(name && description && taxon && address && transferFee && attributes && file)) {
            return ErrorResponse(res, 'Please provide all required fields.', 400);
        }

        // Create a readable stream from the file path
        const fileStream = fs.createReadStream(file.path);
        const nftData = {
            name: name,
            description: description,
            image: new File(
                [
                    fileStream,
                ],
                file.originalname,
                { type: file.mimetype },
            ),
            attributes,
        };

        const metadataUpload = await NFTStorage.encodeNFT(nftData);

        resObj.success = true;
        resObj.data = metadataUpload.token;
        resObj.message = 'Use the cid to mint the NFT.';

        return res.status(200).json(resObj);
    } catch (error) {
        console.error('Error in createNft: ', error);
        return ErrorResponse(res, error.message, 500);
    } finally {
        // Delete the uploaded file
        fs.unlinkSync(req.file.path);
    }
}
