import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ProjectSettingsMenu from './ProjectSettingsMenu';
import ProjectSettingsPhases from './ProjectSettingsPhases';

const ProjectSettingsView = props => {
	const { path, url } = useRouteMatch();
	const baseUrl = url.replace(/\/?$/, '/');

	return (
		<div className="l-split-content">
			<div className="l-left-menu">
				<Switch>
					<Route path={`${path}phases/`}>
						<ProjectSettingsMenu baseUrl={baseUrl} current="phases" />
					</Route>
					<Route path={`${path}users/`}>
						<ProjectSettingsMenu baseUrl={baseUrl} current="users" />
					</Route>
					<Route path={path}>
						<ProjectSettingsMenu baseUrl={baseUrl} current="general" />
					</Route>
				</Switch>
			</div>
			<div className="l-center-content">
				<Switch>
					<Route path={`${path}phases/edit/`}>
						<ProjectSettingsPhases baseUrl={`${baseUrl}phases/`} isEdit={true} />
					</Route>
					<Route path={`${path}phases/`}>
						<ProjectSettingsPhases baseUrl={`${baseUrl}phases/`} isEdit={false} />
					</Route>
				</Switch>
			</div>
		</div>
	);
};

export default ProjectSettingsView;

