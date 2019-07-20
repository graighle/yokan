import React from 'react';
import { connect } from 'react-redux';
import SetupView from './SetupView';
import * as setupActions from '../../actions/setup';

class Setup extends React.Component {

	componentDidMount(){
		this.props.checkSetup();
	}

	render(){
		const { setup } = this.props;
		console.dir(setup);

		return React.createElement(
			SetupView,
			{
				isChecking: setup.isChecking,
				error: setup.error,
				status: setup.status,
			},
			null
		);
	}
}

const mapStateToProps = state => ({
	setup: state.setup,
});

const mapDispatchToProps = dispatch => ({
	checkSetup: () => dispatch(setupActions.checkSetup()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Setup);

