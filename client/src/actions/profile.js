import { createActions } from 'redux-actions';

export const {
	getProfile,
} = createActions({
	GET_PROFILE: [
		() => null,
		() => ({
			api: {
				method: 'GET',
				path: '/profile',
				auth: true,
			},
		})
	],
});

