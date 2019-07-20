import { handleActions } from 'redux-actions';
import * as setupActions from '../actions/setup';

const initialState = {
	isChecking: false,
	error: null,
	status: null,
};

const setup = handleActions(
	{
		[setupActions.checkSetup]: (
			state,
			{ payload: status, error, meta, }
		) => ({
			...state,
			isChecking: !!meta.api,
			error: error ? status : null,
			status: error ? null : status,
		}),
	},
	initialState
);

export default setup;

