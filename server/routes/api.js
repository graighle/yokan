import { Router } from 'express';
import tokenCheck from '../utils/tokenCheck';
import * as setup from '../api/setup';
import * as signIn from '../api/signin';

const router = Router();

router.post('/signin', signIn.signIn);

router.get('/setup', setup.getSetup);
router.post('/setup', setup.postSetup);

router.use(tokenCheck);

export default router;

