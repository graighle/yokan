import { combineActions, handleActions } from 'redux-actions';
import * as authActions from '../actions/auth';

const initialState = {
	user: null,
};

const auth = handleActions(
	{
		[combineActions(authActions.signIn, authActions.restoreSignIn)]: (
			state,
			{ payload: { user }, error, meta, }
		) => ({
			...state,
			user: user || null,
		}),
		[authActions.signOut]: (
			state,
			{ payload, error, meta, }
		) => ({
			...state,
			user: null,
		}),
	},
	initialState
);

export default auth;

