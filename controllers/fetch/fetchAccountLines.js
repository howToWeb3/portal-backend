import { Client, convertHexToString } from 'xrpl';

export const xrplTokenName = value =>
    value?.length === 40 ? convertHexToString(value).replaceAll('\u0000', '') : value;

export default async function fetchAccountLines(req, res) {
    const resObj = {
        success: false,
        error: false,
        message: '',
        data: {},
    };

    try {
        const { query } = req;
        const { address, marker } = query;
        let { limit } = query;
        limit = parseInt(limit);

        if (!(query && address)) {
            resObj.data = {};
            resObj.success = false;
            resObj.error = true;
            resObj.message = `Invalid Request`;
            return res.status(400).json(resObj);
        }

        if (limit && (limit >= 400 || limit <= 20)) {
            resObj.data = {};
            resObj.success = false;
            resObj.error = true;
            resObj.message = `Invalid Request - Limit must be between 20 and 400`;
            return res.status(400).json(resObj);
        }

        const client = new Client(process.env.XRPL_NETWORK);
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
            resObj.data = null;
            resObj.success = false;
            resObj.error = true;
            resObj.message = `Account not found`;
            res.status(404).json(resObj);
            return;
        }

        const request = {
            command: 'account_lines',
            account: address,
            limit,
            marker,
        };

        const response = await client.request(request);
        response.result.lines = response.result.lines.map(line => {
            line.ticker = xrplTokenName(line.currency);
            return line;
        });

        resObj.data = response.result;
        resObj.success = true;
        resObj.error = false;
        resObj.message = `Success`;
        res.status(200).json(resObj);
        await client.disconnect();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
