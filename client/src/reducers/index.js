import { combineReducers } from 'redux';
import auth from './auth';
import dialogs from './dialogs';
import profile from './profile';
import projects from './projects';
import setup from './setup';

export default combineReducers({
	auth,
	dialogs,
	profile,
	projects,
	setup,
});

