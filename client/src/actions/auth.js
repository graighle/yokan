import { createActions } from 'redux-actions';

export const {
	signIn,
	restoreSignIn,
	signOut,
} = createActions({
	SIGN_IN: [
		() => null,
		req => ({
			api: {
				method: 'SIGN_IN',
				path: '/signin',
				body: req,
			},
		})
	],
	RESTORE_SIGN_IN: [
		() => null,
		() => ({
			api: {
				method: 'RESTORE_SIGN_IN',
				path: '/signin',
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

