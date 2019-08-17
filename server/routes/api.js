import { Router } from 'express';
import applyAuthorization from '../utils/applyAuthorization';
import requireAuthorization from '../utils/requireAuthorization';
import * as setup from '../api/setup';
import * as signIn from '../api/signin';

const router = Router();

router.get('/setup', setup.getSetup);
router.post('/setup', setup.postSetup);

router.use(applyAuthorization);

router.post('/signin', signIn.signIn);

router.use(requireAuthorization);

export default router;

