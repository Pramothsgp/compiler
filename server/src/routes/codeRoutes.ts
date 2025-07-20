import express from 'express';
import { compile } from '../controller/compileCode';
import { rateLimiter } from '../middleware/rateLimiter';
import { validateApiKey } from '../middleware/authMiddleware';
const router = express.Router();

router.post('/compile', validateApiKey , rateLimiter ,compile);

export default router;