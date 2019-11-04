import React from 'react';
import ProjectMenuView from './ProjectMenuView';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const tabList = [
	{ key: 'overview',	text: 'Overview',	path: '',			},
	{ key: 'phases',	text: 'Phases',		path: 'phases/',	},
	{ key: 'revisions',	text: 'Revisions',	path: 'revisions/',	},
	{ key: 'tickets',	text: 'Tickets',	path: 'tickets/',	},
	{ key: 'analyses',	text: 'Analyses',	path: 'analyses/',	},
	{ key: 'settings',	text: 'Settings',	path: 'settings/',	},
];

class ProjectMenu extends React.Component {
	render(){
		return React.createElement(
			ProjectMenuView,
			{
				currentTab: this.props.tab,
				tabList,
				clickTab: this.clickTab.bind(this),
			},
			null
		);
	}

	clickTab(e, tab){
		e.preventDefault();

		this.props.history.push(`${this.props.baseUrl}${tab.path}`);
	}

}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectMenu));

