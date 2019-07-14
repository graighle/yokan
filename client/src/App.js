import React from 'react';
import Content from './components/Content';
import Header from './components/Header';
import LeftMenu from './components/LeftMenu';

import 'normalize.css';
import './styles/layouts';
import './styles/modules';
import './styles/themes/default';

const App = () => (
	<div className="l-page">
		<Header />
		<LeftMenu />
		<Content>
		</Content>
	</div>
);

export default App;
