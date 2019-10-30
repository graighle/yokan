import { createActions } from 'redux-actions';

export const {
	getProjects,
} = createActions({
	GET_PROJECTS: [
		() => null,
		() => ({
			api: {
				method: 'GET',
				path: '/projects',
				auth: true,
			},
		})
	],
});

