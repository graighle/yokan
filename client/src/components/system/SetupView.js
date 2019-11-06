import React from 'react';

const SetupView = (props) => (
	<div className="m-content-area">
		<div className="m-content-title">
			Server Setup
		</div>
		<div className="m-content-body m-section">
			<div className="m-section-header">
				Status
			</div>
			<div className="m-section-body">
				{props.isChecking ? <CheckingView /> : null}
				{!!props.error ? <ErrorView error={props.error} /> : null}
				{!!props.status ? <StatusView status={props.status} /> : null}
			</div>

			{props.showInitialSetup ? <InitialSetupView {...props} /> : null}
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
		Server Connection Error: {error.message}
	</div>
);

const StatusView = ({ status }) => (
	<div>
		Ready...{status.ready ? 'yes' : 'no'}
		<div className="l-indent">
			<p>
				{status.message}
			</p>
			<p>
				- Server...{status.server ? 'yes' : 'no'}
			</p>
			<p>
				- Database...{status.database ? 'yes' : 'no'}
			</p>
			<p>
				- Administrator...{status.admin ? 'yes' : 'no'}
			</p>
		</div>
	</div>
);

const InitialSetupView = (props) => (
	<>
		<div className="m-section-header">
			Initial Setup
		</div>
		<div className="m-section-body">
			<dl>
				<dl className="m-label-value">
					<dt>New Administrator</dt>
					<dd>
						<input type="text" className="e-text-input e-w-medium" placeholder="ID" value={props.adminId}
							onChange={props.onChangeAdminId} />
					</dd>
					<dd>
						<input type="password" className="e-text-input e-w-medium" placeholder="Password" value={props.adminPassword}
							onChange={props.onChangeAdminPassword} />
					</dd>
				</dl>
				<div className="m-operations">
					<button className="e-decisive-button t-action-button" onClick={props.onSetup}>Setup</button>
				</div>
			</dl>
		</div>
	</>
);

export default SetupView;

