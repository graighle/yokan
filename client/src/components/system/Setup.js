import React from 'react';
import { connect } from 'react-redux';
import SetupView from './SetupView';
import * as setupActions from '../../actions/setup';

class Setup extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			adminId: '',
			adminPassword: '',
		};
	}

	componentDidMount(){
		this.props.checkSetup();
	}

	render(){
		const { setup } = this.props;

		const showInitialSetup = setup.status && setup.status.ready === false;

		return React.createElement(
			SetupView,
			{
				showInitialSetup,
				isChecking: setup.isChecking,
				error: setup.error,
				status: setup.status,
				adminId: this.state.adminId,
				adminPassword: this.state.adminPassword,
				onChangeAdminId: e => this.setState({adminId: e.target.value}),
				onChangeAdminPassword: e => this.setState({adminPassword: e.target.value}),
				onSetup: this.sendSetup.bind(this),
			},
			null
		);
	}

	sendSetup(){
		const adminId = this.state.adminId.trim();
		const adminPassword = this.state.adminPassword.trim();

		if(adminId.length === 0 || adminPassword.length === 0)
			return;

		const params = {
			admin: {
				id: adminId,
				password: adminPassword,
			},
		};

		this.props.executeSetup(params);
	}
}

const mapStateToProps = state => ({
	setup: state.setup,
});

const mapDispatchToProps = dispatch => ({
	checkSetup: () => dispatch(setupActions.checkSetup()),
	executeSetup: setup => dispatch(setupActions.executeSetup(setup)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Setup);

