import React from 'react';
import { connect } from 'react-redux';
import ContentView from './ContentView';

class Content extends React.Component {
	render(){
		if(this.props.auth.restoring)
			return null;

		return React.createElement(
			ContentView,
			{
			},
			this.props.children
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Content);

