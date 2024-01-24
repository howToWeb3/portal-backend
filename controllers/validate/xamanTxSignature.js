import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

export default async function validateXamanSign(req, res) {
    const resObj = {
        success: false,
        error: false,
        message: '',
        data: {},
    };

    try {
        const { query } = req;

        if (!(query && query.uuid)) {
            resObj.data = {};
            resObj.success = false;
            resObj.error = true;
            resObj.message = `Invalid Request`;
            res.status(400).json(resObj);
            return;
        }

        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'X-API-Key': process.env.XUMM_API_KEY,
                'X-API-Secret': process.env.XUMM_API_SECRET,
            },
        };

        const {
            response: { account },
            meta: { signed },
        } = await fetch(`https://xumm.app/api/v1/platform/payload/${query.uuid}`, options).then(response =>
            response.json(),
        );

        if (!signed) {
            resObj.data = null;
            resObj.success = false;
            resObj.error = true;
            resObj.message = `User has not signed the payload`;
            res.status(400).json(resObj);
            return;
        }

        if (account) {
            const token = jwt.sign({ address: account }, process.env.TOKEN_KEY, { expiresIn: '1d' });
            resObj.data = { address: account, token };
            resObj.success = true;
            resObj.error = false;
            resObj.message = `Success`;
            res.status(200).json(resObj);
            return;
        }

        resObj.data = null;
        resObj.success = false;
        resObj.error = true;
        resObj.message = `Some error occured, Please try again`;
        res.status(500).json(resObj);
        return;
    } catch (err) {
        console.log(err);
        resObj.data = null;
        resObj.success = false;
        resObj.error = true;
        resObj.message = `Internal Error, Please try again`;
        res.status(500).json(resObj);
    }
    return;
}
