import { Router } from 'express';
import applyAuthorization from '../utils/applyAuthorization';
import requireAuthorization from '../utils/requireAuthorization';
import * as projects from '../api/projects';
import * as setup from '../api/setup';
import * as signIn from '../api/signin';

const router = Router();

router.get('/setup', setup.getSetup);
router.post('/setup', setup.postSetup);

router.use(applyAuthorization);

router.get('/projects', projects.getProjects);
router.get('/projects/:project_id', projects.getProject);
router.post('/projects', projects.postProjects);
router.patch('/projects/:project_id', projects.patchProject);

router.post('/signin', signIn.signIn);

router.use(requireAuthorization);

export default router;

