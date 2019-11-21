import { isError } from 'flux-standard-action';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProjectSettingsPhasesView from './ProjectSettingsPhasesView';
import * as projectActions from '../../../actions/project';
import { ArrayReplacedAt, ArraySwapped } from '../../../utils/ArrayUtils';

class ProjectSettings extends React.Component {
	constructor(props){
		super(props);

		this.state = {
		};
	}

	componentDidMount(){
		this.copyPropsToStatesForEdit();
	}

	componentDidUpdate(prevProps){
		if(this.props.isEdit && !prevProps.isEdit)
			this.copyPropsToStatesForEdit();
	}

	render(){
		const { projects, match } = this.props;

		const projectId = match.params.project_id;
		const project = projects.byId[projectId];
		if(!project)
			return null;

		return React.createElement(
			ProjectSettingsPhasesView,
			{
				isEdit: this.props.isEdit,
				phases: (this.props.isEdit ? this.state.phases : project.phases) || [],
				changePhaseName: this.changePhaseName.bind(this),
				clickEditPhases: this.clickEditPhases.bind(this),
				clickRemove: this.clickRemove.bind(this),
				clickMoveUp: this.clickMoveUp.bind(this),
				clickMoveDown: this.clickMoveDown.bind(this),
				clickAddPhase: this.clickAddPhase.bind(this),
				clickSavePhases: this.clickSavePhases.bind(this),
				clickCancelPhases: this.clickCancelPhases.bind(this),
			},
			null
		);
	}

	copyPropsToStatesForEdit(){
		const { projects, match } = this.props;

		const projectId = match.params.project_id;
		const project = projects.byId[projectId];
		if(!project)
			return null;

		this.setState({
			phases: project.phases,
		});
	}

	changePhaseName(e, id){
		e.preventDefault();

		const index = this.state.phases.findIndex(p => p.id === id);
		const phase = this.state.phases[index];

		this.setState({
			phases: ArrayReplacedAt(
				this.state.phases,
				index,
				{
					...phase,
					name: e.target.value,
				}
			),
		});
	}

	clickEditPhases(e){
		e.preventDefault();

		this.props.history.push(`${this.props.baseUrl}edit/`);
	}

	clickRemove(e, id){
		e.preventDefault();

		this.setState({
			phases: this.state.phases.filter(p => p.id !== id),
		});
	}

	clickMoveUp(e, id){
		e.preventDefault();

		const index = this.state.phases.findIndex(p => p.id === id);
		if(index < 1)
			return;

		this.setState({
			phases: ArraySwapped(this.state.phases, index, index - 1),
		});
	}

	clickMoveDown(e, id){
		e.preventDefault();

		const index = this.state.phases.findIndex(p => p.id === id);
		if(index === -1 || index === this.state.phases.length - 1)
			return;

		this.setState({
			phases: ArraySwapped(this.state.phases, index, index + 1),
		});
	}

	clickAddPhase(e){
		e.preventDefault();

		const id = this.state.phases.reduce((lhs, rhs) => Math.max(lhs, rhs.id), 0) + 1;

		this.setState({
			phases: [
				...this.state.phases,
				{
					id,
					name: '',
				},
			],
		});
	}

	clickSavePhases(e){
		e.preventDefault();

		let updates = {
			phases: this.state.phases,
		};

		const projectId = this.props.match.params.project_id;
		this.props.updateProject(projectId, updates)
			.then(ret => {
				if(isError(ret))
					alert(ret.payload.message);
				else
					this.props.history.push(`${this.props.baseUrl}`);
			});
	}

	clickCancelPhases(e){
		e.preventDefault();

		this.props.history.push(`${this.props.baseUrl}`);
	}

}

const mapStateToProps = state => ({
	projects: state.projects,
});

const mapDispatchToProps = dispatch => ({
	updateProject: (projectId, updates) => dispatch(projectActions.updateProject(projectId, updates)),
});

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectSettings));

