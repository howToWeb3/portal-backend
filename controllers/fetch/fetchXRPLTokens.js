import { xrplTokenName } from '../../utils/common.utils.js';
import fetch from 'node-fetch';

export default async function fetchXRPLTokens(req, res) {
    const resObj = {
        success: false,
        error: false,
        message: '',
        data: [],
    };

    try {
        const { query } = req;
        const { name, sort } = query;
        let url = new URL('https://s1.xrplmeta.org/tokens');

        if (name) {
            url.searchParams.append('name_like', name);
        }

        if (sort) {
            url.searchParams.append('sort_by', sort);
        } else {
            url.searchParams.append('sort_by', 'trustlines');
        }

        const data = await fetch(url).then(res => res.json());
        const { tokens } = data;

        if (!tokens || tokens.length === 0) {
            resObj.data = null;
            resObj.success = false;
            resObj.error = true;
            resObj.message = `No tokens found`;
            res.status(404).json(resObj);
            return;
        }

        resObj.data = tokens.map(token => ({
            ticker: token.meta.token.name ? token.meta.token.name : xrplTokenName(token.currency),
            currency: token.currency,
            issuer: token.issuer,
            icon:
                token.meta.token.icon ??
                token.meta.issuer.icon ??
                'https://cdn.jsdelivr.net/gh/moonboi589/assets/images/png/logo/HWT3_logo_baseflat.png',
        }));

        resObj.success = true;
        resObj.error = false;
        resObj.message = `Tokens fetched successfully`;

        res.status(200).json(resObj);
    } catch (err) {
        res.status(500).json({
            message: err.message || 'Some error occurred while fetching XRPL tokens.',
        });
    }
}
