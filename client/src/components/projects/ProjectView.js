import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ProjectMenu from './ProjectMenu';
import ProjectSettings from './settings/ProjectSettings';

const ProjectView = props => {

	const { path, url } = useRouteMatch();
	const baseUrl = url.replace(/\/?$/, '/');

	return (
		<div className="m-content-area">
			<div className="m-content-title">
				{props.project.name}
			</div>
			<div className="m-content-body">
				<Switch>
					<Route path={`${path}/phases/`}>
						<ProjectMenu baseUrl={baseUrl} tab="phases" />
					</Route>
					<Route path={`${path}/steps/`}>
						<ProjectMenu baseUrl={baseUrl} tab="steps" />
					</Route>
					<Route path={`${path}/tickets/`}>
						<ProjectMenu baseUrl={baseUrl} tab="tickets" />
					</Route>
					<Route path={`${path}/analyses/`}>
						<ProjectMenu baseUrl={baseUrl} tab="analyses" />
					</Route>
					<Route path={`${path}/settings/`}>
						<ProjectMenu baseUrl={baseUrl} tab="settings" />
						<ProjectSettings />
					</Route>
					<Route path={path}>
						<ProjectMenu baseUrl={baseUrl} tab="overview" />
					</Route>
				</Switch>
			</div>
		</div>
	);
};

export default ProjectView;

