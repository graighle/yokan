import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Content from './components/Content';
import Header from './components/Header';
import LeftMenu from './components/LeftMenu';
import Setup from './components/system/Setup';

import 'normalize.css';
import './styles/elements';
import './styles/layouts';
import './styles/modules';
import './styles/themes/default';

const App = () => (
	<div className="l-page">
		<Header />
		<LeftMenu />
		<Content>
			<Switch>
				<Route path="/setup" component={Setup} />
			</Switch>
		</Content>
	</div>
);

export default App;
