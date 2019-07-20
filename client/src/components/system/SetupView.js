import React from 'react';

const SetupView = (props) => (
	<div className="m-content-area">
		<div className="m-content-title e-content-title">
			API Server Setup
		</div>
		<div className="m-content-body">
			{props.isChecking ? <CheckingView /> : null}
			{!!props.error ? <ErrorView error={props.error} /> : null}
			{!!props.status ? <StatusView status={props.status} /> : null}
		</div>
	</div>
);

const CheckingView = () => (
	<div>
		Checking...
	</div>
);

const ErrorView = ({ error }) => (
	<div>
		Error: {error.message}
	</div>
);

const StatusView = ({ status }) => (
	<div>
		Status:
	</div>
);

export default SetupView;

