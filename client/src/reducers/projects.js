import { combineActions, handleActions } from 'redux-actions';
import * as projectActions from '../actions/project';

const initialState = {
	byId: {},
	allIds: [],
};

const projects = handleActions(
	{
		[combineActions(
			projectActions.getProject,
			projectActions.updateProject
		)]: (
			state,
			{ payload: project, error, meta, }
		) => ((meta.api || error) ? state : {
			...state,
			byId: { ...state.byId, [project.id]: project, },
			allIds: state.byId[project.id] ? state.allIds : [...state.allIds, project.id],
		}),
		[projectActions.getProjects]: (
			state,
			{ payload: projects, error, meta, }
		) => ((meta.api || error) ? state : {
			...state,
			byId: projects.reduce((ps, p) => ({...ps, [p.id]: p,}), {}),
			allIds: projects.map(p => p.id),
		}),
	},
	initialState
);

export default projects;

