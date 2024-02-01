import { XummSdk } from 'xumm-sdk';

export default async function createXamanQRCode(req, res) {
    const resObj = {
        success: false,
        error: false,
        message: '',
        data: {},
    };

    try {
        if (!req.body) {
            resObj.message = 'Invalid Request';
            res.status(400).json(resObj);
            return;
        }

        const Sdk = new XummSdk(process.env.XUMM_API_KEY, process.env.XUMM_API_SECRET);
        const payload = await Sdk.payload.create(req.body, true);
        resObj.data = payload;
        res.status(200).json(resObj);
    } catch (error) {
        console.log(error);
        resObj.data = null;
        resObj.success = false;
        resObj.error = true;
        resObj.message = 'Internal Error, Please try again';
        res.status(500).json(resObj);
    }
}
