import React from 'react';
import HeaderView from './HeaderView';
import { connect } from 'react-redux';
import * as authActions from '../actions/auth';
import * as dialogActions from '../actions/dialog';

class Header extends React.Component {
	componentDidMount(){
		this.props.restoreSignIn();
	}

	render(){
		const { auth } = this.props;

		return React.createElement(
			HeaderView,
			{
				signInUser: auth.user,
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
			onSignInResult: this.signInResult.bind(this),
		});
	}

	closeSignInDialog(e){
		if(e)
			e.preventDefault();

		this.props.closeSignInDialog();
	}

	signInResult(success, message){
		if(success){
			this.props.closeSignInDialog();
		}else{
			const msg = message || 'Sign in failed.';
			alert(msg);
		}
	}

}

const mapStateToProps = state => ({
	auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
	restoreSignIn: () => dispatch(authActions.restoreSignIn()),
	openSignInDialog: (options) => dispatch(dialogActions.openSignInDialog(options)),
	closeSignInDialog: () => dispatch(dialogActions.closeSignInDialog()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);

