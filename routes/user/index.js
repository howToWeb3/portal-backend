import createXamanQRCode from '../../controllers/create/xamanQRCode.js';
import fetchAccountDetails from '../../controllers/fetch/fetchAccountDetails.js';
import fetchAccountLines from '../../controllers/fetch/fetchAccountLines.js';
import fetchAccountNfts from '../../controllers/fetch/fetchAccountNfts.js';
import validateXamanSign from '../../controllers/validate/xamanTxSignature.js';
import { Router } from 'express';

const router = Router();

router.post('/xaman/qr-generate', createXamanQRCode);
router.get('/xaman/validate', validateXamanSign);
router.get('/account/details', fetchAccountDetails);
router.get('/account/nfts', fetchAccountNfts);
router.get('/account/lines', fetchAccountLines);

export default router;
