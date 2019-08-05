import { Router } from 'express';
import tokenCheck from '../utils/tokenCheck';
import * as setup from '../api/setup';
import * as login from '../api/login';

const router = Router();

router.post('/login', login.login);

router.get('/setup', setup.getSetup);
router.post('/setup', setup.postSetup);

router.use(tokenCheck);

export default router;

