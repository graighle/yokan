import React from 'react';
import ProjectSettingsMenuView from './ProjectSettingsMenuView';
import { withRouter } from 'react-router';

const menuItems = [
	{ key: 'general',	text: 'General',	path: '',			},
	{ key: 'phases',	text: 'Phases',		path: 'phases/',	},
	{ key: 'users',		text: 'Users',		path: 'users/',		},
];

class ProjectSettingsMenu extends React.Component {
	render(){
		return React.createElement(
			ProjectSettingsMenuView,
			{
				current: this.props.current,
				menuItems,
				clickMenuItem: this.clickMenuItem.bind(this),
			},
			null
		);
	}

	clickMenuItem(e, item){
		e.preventDefault();

		this.props.history.push(`${this.props.baseUrl}${item.path}`);
	}

}

export default withRouter(ProjectSettingsMenu);

