import React from 'react';
import DashboardView from './DashboardView';
import { connect } from 'react-redux';
import * as projectActions from '../actions/project';

class Dashboard extends React.Component {
	componentDidMount(){
		this.props.getProjects();
	}

	render(){
		const { projects } = this.props;

		return React.createElement(
			DashboardView,
			{
				projects: projects.allIds.map(id => projects.byId[id]),
			},
			null
		);
	}

}

const mapStateToProps = state => ({
	auth: state.auth,
	projects: state.projects,
});

const mapDispatchToProps = dispatch => ({
	getProjects: () => dispatch(projectActions.getProjects()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);

