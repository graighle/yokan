import React from 'react';
import DialogRendererView from './DialogRendererView';
import { connect } from 'react-redux';

class DialogRenderer extends React.Component {

	render(){
		const {dialogs} = this.props;

		return React.createElement(
			DialogRendererView,
			{
				dialogs: dialogs.dialogs,
				visible: dialogs.dialogs.length !== 0,
			},
			null
		);
	}
}

const mapStateToProps = state => ({
	dialogs: state.dialogs,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DialogRenderer);

