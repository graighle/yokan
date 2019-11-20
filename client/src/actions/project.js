import { createActions } from 'redux-actions';

export const {
	getProject,
	updateProject,
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
	UPDATE_PROJECT: [
		() => null,
		(projectId, updates) => ({
			api: {
				method: 'PATCH',
				path: '/projects/' + projectId,
				auth: true,
				body: updates,
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

