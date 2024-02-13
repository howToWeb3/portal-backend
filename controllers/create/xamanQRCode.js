import fetch from 'node-fetch';

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
        const { XamanToken, ...tx } = req.body;

        const xummUrl = 'https://xumm.app/api/v1/platform/payload';
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-API-Key': process.env.XUMM_API_KEY,
                'X-API-Secret': process.env.XUMM_API_SECRET,
            },
            body: JSON.stringify({
                txjson: tx,
                options: { pathfinding_fallback: false, force_network: 'N/A' },
            }),
        };

        if (XamanToken) {
            options.body.user_token = XamanToken;
        }

        const xummRes = await fetch(xummUrl, options).then(response => response.json());
        resObj.data = xummRes;
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
