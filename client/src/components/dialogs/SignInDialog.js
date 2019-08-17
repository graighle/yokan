import React from 'react';
import { connect } from 'react-redux';
import SignInDialogView from './SignInDialogView';
import * as authActions from '../../actions/auth';

class SignInDialog extends React.Component {
	constructor(props){
		super(props);

		this.elements = {
			id: React.createRef(),
		};

		this.state = {
			id: '',
			password: '',
		};
	}

	componentDidMount(){
		this.elements.id.current.focus();
	}

	render(){
		return React.createElement(
			SignInDialogView,
			{
				id: this.state.id,
				password: this.state.password,
				changeId: this.changeId.bind(this),
				changePassword: this.changePassword.bind(this),
				signIn: this.signIn.bind(this),
				ref: this.elements,
			},
			null
		);
	}

	changeId(e){
		this.setState({id: e.target.value});
	}

	changePassword(e){
		this.setState({password: e.target.value});
	}

	signIn(e){
		e.preventDefault();

		const id = this.state.id.trim();
		const password = this.state.password.trim();
		if(id.length === 0 || password.length === 0)
			return;

		this.props.signIn({
			id,
			password,
		})
		.then(ret => {
			this.props.options.onSignInResult(!ret.error, ret.message);
		});
	}
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
	signIn: req => dispatch(authActions.signIn(req)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignInDialog);

