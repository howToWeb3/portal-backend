import fetch from 'node-fetch';

export default async function fetchAccountDetails(req, res) {
    const resObj = {
        success: false,
        error: false,
        message: '',
        data: {},
    };

    try {
        const { query } = req;
        const { address } = query;

        if (!(query && address)) {
            resObj.data = {};
            resObj.success = false;
            resObj.error = true;
            resObj.message = `Invalid Request`;
            return;
        }

        const xrp_scan_data = await fetch(`https://api.xrpscan.com/api/v1/account/${address}`).then(response =>
            response.json(),
        );

        resObj.data = xrp_scan_data;
        resObj.success = true;
        resObj.error = false;
        resObj.message = `Success`;
        res.status(200).json(resObj);
        // await client.disconnect();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
