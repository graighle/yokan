import { createActions } from 'redux-actions';

export const {
	signIn,
	restoreSignIn,
	signOut,
} = createActions({
	SIGN_IN: [
		() => ({}),
		req => ({
			api: {
				method: 'SIGN_IN',
				body: req,
			},
		})
	],
	RESTORE_SIGN_IN: [
		() => ({}),
		() => ({
			api: {
				method: 'RESTORE_SIGN_IN',
			},
		})
	],
	SIGN_OUT: [
		() => null,
		() => ({
			api: {
				method: 'SIGN_OUT',
			},
		})
	],
});

