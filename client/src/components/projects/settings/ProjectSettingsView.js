import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ProjectSettingsMenu from './ProjectSettingsMenu';

const ProjectSettingView = props => {
	const { path, url } = useRouteMatch();
	const baseUrl = url.replace(/\/?$/, '/');

	return (
		<>
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
			</div>
		</>
	);
};

export default ProjectSettingView;

