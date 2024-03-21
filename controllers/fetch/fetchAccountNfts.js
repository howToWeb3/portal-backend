import { Client, convertHexToString } from 'xrpl';

export default async function fetchAccountNfts(req, res) {
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
        limit = limit ? parseInt(limit) : 25;

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
            resObj.message = `Invalid Request - Limit must be more than 20 and less than 400`;
            return res.status(400).json(resObj);
        }

        await client.connect();

        const request = {
            command: 'account_nfts',
            account: address,
            limit,
            marker,
        };

        const account_nfts = await client.request(request);

        let nfts = account_nfts.result.account_nfts;

        nfts.forEach(nft => {
            nft.URI = convertHexToString(nft.URI);
        });

        resObj.data = {
            marker: account_nfts.result.marker,
            limit: account_nfts.result.limit,
            nfts,
        };
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
