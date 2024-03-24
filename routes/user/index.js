import createXamanQRCode from '../../controllers/create/xamanQRCode.js';
import fetchAccountDetails from '../../controllers/fetch/fetchAccountDetails.js';
import fetchAccountLines from '../../controllers/fetch/fetchAccountLines.js';
import fetchAccountNfts from '../../controllers/fetch/fetchAccountNfts.js';
import fetchFeaturedCollections from '../../controllers/fetch/fetchFeaturedCollections.js';
import fetchNfts from '../../controllers/fetch/fetchNfts.js';
import fetchTrendingNftCollections from '../../controllers/fetch/fetchTrendingCollections.js';
import fetchXRPLTokens from '../../controllers/fetch/fetchXRPLTokens.js';
// import getCidForMint from '../../controllers/fetch/getCidForMint.js';
import validateXamanSign from '../../controllers/validate/xamanTxSignature.js';
import checkAccountValidity from '../../helpers/checkAccountValidity.js';
import { Router } from 'express';

// import multer from 'multer';

const router = Router();
// const upload = multer({ dest: 'uploads/' });

router.post('/xaman/qr-generate', createXamanQRCode);
router.get('/xaman/validate', validateXamanSign);
router.get('/account/details', checkAccountValidity, fetchAccountDetails);
router.get('/account/nfts', checkAccountValidity, fetchAccountNfts);
router.get('/account/lines', checkAccountValidity, fetchAccountLines);
router.get('/xrpl/tokens', fetchXRPLTokens);
// router.post('/fetch/nft/cid', upload.single('image'), getCidForMint);
router.get('/fetch/nfts/featured', fetchFeaturedCollections);
router.get('/fetch/nfts/trending', fetchTrendingNftCollections);
router.get('/fetch/nfts', fetchNfts);

export default router;
