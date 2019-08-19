import { combineActions, handleActions } from 'redux-actions';
import * as dialogActions from '../actions/dialog';

const initialState = {
	nextId: 0,
	dialogs: [
	],
};

const dialog = handleActions(
	{
		[dialogActions.closeDialogById]: (
			state,
			{ payload: { id, }, error, meta, }
		) => ({
			...state,
			dialogs: state.dialogs.filter(d => d.id !== id),
		}),
		[combineActions(
			dialogActions.openSettingMenuDialog,
			dialogActions.openSignInDialog
		)]: (
			state,
			{ payload: { type, options, }, error, meta, }
		) => ({
			...state,
			nextId: state.nextId + 1,
			dialogs: [...state.dialogs, {
				id: state.nextId,
				type,
				options,
			}],
		}),
		[combineActions(
			dialogActions.closeSettingMenuDialog,
			dialogActions.closeSignInDialog
		)]: (
			state,
			{ payload: { type, }, }
		) => ({
			...state,
			dialogs: state.dialogs.filter(d => d.type !== type),
		}),
	},
	initialState
);

export default dialog;

