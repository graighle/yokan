import { createActions } from 'redux-actions';

export const {
	checkSetup,
} = createActions({
	CHECK_SETUP: [
		() => null,
		() => ({
			api: {
				method: 'GET',
				path: '/setup',
			},
		})
	],
});

