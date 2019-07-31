import { createActions } from 'redux-actions';

export const {
	checkSetup,
	executeSetup,
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
	EXECUTE_SETUP: [
		() => null,
		setup => ({
			api: {
				method: 'POST',
				path: '/setup',
				body: setup,
			},
		})
	],
});

