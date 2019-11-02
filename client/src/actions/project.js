import { createActions } from 'redux-actions';

export const {
	getProject,
	getProjects,
} = createActions({
	GET_PROJECT: [
		() => null,
		projectId => ({
			api: {
				method: 'GET',
				path: '/projects/' + projectId,
				auth: true,
			},
		})
	],
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

