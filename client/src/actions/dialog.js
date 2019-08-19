import { createActions } from 'redux-actions';

export const {
	closeDialogById,
	openSettingMenuDialog,
	closeSettingMenuDialog,
	openSignInDialog,
	closeSignInDialog,
} = createActions({
	CLOSE_DIALOG_BY_ID: dialogId => ({
		id: dialogId,
	}),
	OPEN_SETTING_MENU_DIALOG: options => ({
		type: 'setting_menu',
		options,
	}),
	CLOSE_SETTING_MENU_DIALOG: () => ({
		type: 'setting_menu',
	}),
	OPEN_SIGN_IN_DIALOG: options => ({
		type: 'sign_in',
		options,
	}),
	CLOSE_SIGN_IN_DIALOG: () => ({
		type: 'sign_in',
	}),
});

