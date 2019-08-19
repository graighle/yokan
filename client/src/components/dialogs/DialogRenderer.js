import React from 'react';
import DialogRendererView from './DialogRendererView';
import { connect } from 'react-redux';
import * as dialogActions from '../../actions/dialog';

class DialogRenderer extends React.Component {

	render(){
		const {dialogs} = this.props;

		return React.createElement(
			DialogRendererView,
			{
				dialogs: dialogs.dialogs,
				visible: dialogs.dialogs.length !== 0,
				clickOverlay: this.clickOverlay.bind(this),
			},
			null
		);
	}

	clickOverlay(e, dialogId){
		this.props.closeDialogById(dialogId);
	}
}

const mapStateToProps = state => ({
	dialogs: state.dialogs,
});

const mapDispatchToProps = dispatch => ({
	closeDialogById: dialogId => dispatch(dialogActions.closeDialogById(dialogId)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DialogRenderer);

