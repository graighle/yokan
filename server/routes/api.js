import { Router } from 'express';
import * as setup from '../api/setup';

const router = Router();

router.get('/setup', setup.getSetup);

export default router;

