import createXamanQRCode from '../../controllers/create/xamanQRCode.js';
import { Router } from 'express';

const router = Router();

router.get('/xaman/qr-generate', createXamanQRCode);
