import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProjectView from './ProjectView';
import * as projectActions from '../../actions/project';

class Project extends React.Component {
	componentDidMount(){
		const { match } = this.props;

		this.props.getProject(match.params.project_id);
	}

	render(){
		const { match, projects } = this.props;

		const project = projects.byId[match.params.project_id];
		if(!project)
			return null;

		return React.createElement(
			ProjectView,
			{
				project,
			},
			null
		);
	}
}

const mapStateToProps = state => ({
	projects: state.projects,
});

const mapDispatchToProps = dispatch => ({
	getProject: pid => dispatch(projectActions.getProject(pid)),
});

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Project));

