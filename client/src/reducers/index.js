import { combineReducers } from 'redux';
import dialogs from './dialogs';
import profile from './profile';
import setup from './setup';

export default combineReducers({
	dialogs,
	profile,
	setup,
});

