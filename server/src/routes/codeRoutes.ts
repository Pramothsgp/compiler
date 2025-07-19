import express from 'express';
import { compile } from '../controller/compileCode';
const router = express.Router();

router.post('/compile', compile);

export default router;