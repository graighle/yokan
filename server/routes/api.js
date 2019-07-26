import { Router } from 'express';
import * as setup from '../api/setup';

const router = Router();

router.get('/setup', setup.getSetup);
router.post('/setup', setup.postSetup);

export default router;

