import { xrplTokenName } from '../../utils/common.utils.js';
import { Client } from 'xrpl';

export default async function fetchAccountLines(req, res) {
    const resObj = {
        success: false,
        error: false,
        message: '',
        data: {},
    };
    const client = new Client(process.env.XRPL_NETWORK);

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

        await client.connect();

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
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        await client.disconnect();
    }
}
