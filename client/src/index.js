import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers';
import createApiCaller from './middlewares/ApiCaller';

const logger = createLogger();

const apiCaller = createApiCaller({
	url: 'http://localhost:5000/api',
});

const store = createStore(
	rootReducer,
	applyMiddleware(
		apiCaller,
		thunk,
		logger
	)
);

ReactDOM.render(
	<Root store={store} />,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
