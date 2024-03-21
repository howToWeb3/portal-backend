import ErrorResponse from './errorResponse.js';
import { Client } from 'xrpl';

export default async function checkAccountValidity(req, res, next) {
    const client = new Client(process.env.XRPL_NETWORK);

    try {
        const address = req.body.address || req.query.address || req.params.address;
        await client.connect();

        const newAccount = await client
            .request({
                command: 'account_info',
                account: address,
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
            return res.status(400).json({
                success: false,
                error: true,
                message: `Account not found`,
                data: null,
            });
        }

        next();
    } catch (error) {
        return ErrorResponse(res, error.message);
    } finally {
        await client.disconnect();
    }
}
