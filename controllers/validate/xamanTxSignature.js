import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import { Client } from 'xrpl';

export default async function validateXamanSign(req, res) {
    const resObj = {
        success: false,
        error: false,
        message: '',
        data: {},
    };

    const client = new Client(process.env.XRPL_NETWORK);

    try {
        const { query } = req;

        // Set jwt to true by default - which means return jwt token
        if (!query.jwt) query.jwt = true;

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

        const xummRes = await fetch(`https://xumm.app/api/v1/platform/payload/${query.uuid}`, options).then(response =>
            response.json(),
        );

        const {
            response: { account },
            meta: { signed },
            application: { issued_user_token },
        } = xummRes;

        if (!signed) {
            resObj.data = null;
            resObj.success = false;
            resObj.error = true;
            resObj.message = `User has not signed the payload`;
            res.status(400).json(resObj);
            return;
        }

        if (account) {
            await client.connect();

            const newAccount = await client
                .request({
                    command: 'account_info',
                    account: account,
                })
                .then(() => {
                    return false;
                })
                .catch(err => {
                    if (err.data.error === 'actNotFound') {
                        return true;
                    }
                    return false;
                });

            if (newAccount) {
                return res.status(200).json({
                    success: false,
                    error: true,
                    message: `Account not found`,
                    data: null,
                });
            }

            const token = jwt.sign({ address: account }, process.env.TOKEN_KEY, { expiresIn: '1d' });

            resObj.data = {
                address: account,
                token: Boolean(query.jwt) === true ? token : null,
                xamanToken: issued_user_token,
            };

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
    } finally {
        await client.disconnect();
    }
}
