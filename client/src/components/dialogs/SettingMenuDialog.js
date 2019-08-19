import React from 'react';
import { connect } from 'react-redux';
import SettingMenuDialogView from './SettingMenuDialogView';
import * as authActions from '../../actions/auth';
import * as dialogActions from '../../actions/dialog';

class SettingMenuDialog extends React.Component {
	render(){
		return React.createElement(
			SettingMenuDialogView,
			{
				clickSignOut: this.signOut.bind(this),
			},
			null
		);
	}

	signOut(e){
		e.preventDefault();

		this.props.signOut();
		this.props.closeDialog();
	}

}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
	closeDialog: () => dispatch(dialogActions.closeSettingMenuDialog()),
	signOut: () => dispatch(authActions.signOut()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingMenuDialog);

