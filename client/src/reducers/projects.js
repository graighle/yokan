import { handleActions } from 'redux-actions';
import * as projectActions from '../actions/project';

const initialState = {
	byId: {},
	allIds: [],
};

const projects = handleActions(
	{
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

