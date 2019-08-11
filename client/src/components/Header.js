import React from 'react';
import HeaderView from './HeaderView';
import { connect } from 'react-redux';
import * as dialogActions from '../actions/dialog';
import * as profileActions from '../actions/profile';

class Header extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			signInDialogId: null,
		};
	}

	render(){
		const { profile } = this.props;

		return React.createElement(
			HeaderView,
			{
				signinUser: profile.user,
				openSignInDialog: this.openSignInDialog.bind(this),
			},
			null
		);
	}

	openSignInDialog(e){
		e.preventDefault();

		this.props.openSignInDialog({
			onClose: this.closeSignInDialog.bind(this),
			onClickOverlay: this.closeSignInDialog.bind(this),
		});
	}

	closeSignInDialog(e){
		if(e)
			e.preventDefault();

		this.props.closeSignInDialog();
	}
}

const mapStateToProps = state => ({
	profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
	getProfile: () => dispatch(profileActions.getProfile()),
	openSignInDialog: (options) => dispatch(dialogActions.openSignInDialog(options)),
	closeSignInDialog: () => dispatch(dialogActions.closeSignInDialog()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);

