import { createActions } from 'redux-actions';

export const {
	openSignInDialog,
	closeSignInDialog,
} = createActions({
	OPEN_SIGN_IN_DIALOG: (options) => options,
	CLOSE_SIGN_IN_DIALOG: null,
});

