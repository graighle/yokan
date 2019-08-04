import { combineReducers } from 'redux';
import dialogs from './dialogs';
import setup from './setup';

export default combineReducers({
	dialogs,
	setup,
});

