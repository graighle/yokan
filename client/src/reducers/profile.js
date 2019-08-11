import { handleActions } from 'redux-actions';
import * as profileActions from '../actions/profile';

const initialState = {
	user: null,
};

const profile = handleActions(
	{
		[profileActions.getProfile]: (
			state,
			{ payload, error, meta, }
		) => ({
			...state,
			user: meta.api ? state.user : (error ? null : payload.user),
		}),
	},
	initialState
);

export default profile;


