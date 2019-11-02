import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const ProjectView = props => {

	const { path } = useRouteMatch();

	return (
		<div className="m-content-area">
			<div className="m-content-title">
				{props.project.name}
			</div>
			<div className="m-content-body">
				<Switch>
				</Switch>
			</div>
		</div>
	);
};

export default ProjectView;

