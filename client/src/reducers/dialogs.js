import { handleActions } from 'redux-actions';
import * as dialogActions from '../actions/dialog';

const initialState = {
	nextId: 0,
	dialogs: [
	],
};

const dialog = handleActions(
	{
		[dialogActions.openSignInDialog]: (
			state,
			{ payload: options, error, meta, }
		) => ({
			...state,
			nextId: state.nextId + 1,
			dialogs: [...state.dialogs, {
				id: state.nextId,
				type: 'sign_in',
				options,
			}],
		}),
		[dialogActions.closeSignInDialog]: (
			state,
			action
		) => ({
			...state,
			dialogs: state.dialogs.filter(d => d.type !== 'sign_in'),
		}),
	},
	initialState
);

export default dialog;

