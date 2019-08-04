import React from 'react';
import DialogBoxView from './DialogBoxView';

class DialogBox extends React.Component {
	render(){
		return React.createElement(
			DialogBoxView,
			{
			},
			this.props.children
		);
	}
}

export default DialogBox;

