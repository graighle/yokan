import React from 'react';
import ContentView from './ContentView';

class Content extends React.Component {

	render(){
		return React.createElement(
			ContentView,
			{
			},
			this.props.children
		);
	}
}

export default Content;

