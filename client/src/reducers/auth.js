import { handleActions } from 'redux-actions';
import * as authActions from '../actions/auth';

const initialState = {
	restoring: true,
	user: null,
};

const auth = handleActions(
	{
		[authActions.signIn]: (
			state,
			{ payload: { user, }, error, meta, }
		) => ({
			...state,
			user: user || null,
		}),
		[authActions.restoreSignIn]: (
			state,
			{ payload: { user, }, error, meta, }
		) => ({
			...state,
			restoring: !!meta.api,
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

