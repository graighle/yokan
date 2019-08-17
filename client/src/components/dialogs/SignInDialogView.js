import React from 'react';
import DialogBox from './DialogBox';

const SignInDialogView = React.forwardRef((props, refs) => (
	<DialogBox>
		<form onSubmit={props.signIn}>
			<dl className="m-label-value">
				<dt>ID</dt>
				<dd>
					<input type="text" className="e-text-input e-w-medium" value={props.id} ref={refs.id}
						onChange={props.changeId}
					/>
				</dd>
				<dt>Password</dt>
				<dd>
					<input type="text" className="e-text-input e-w-medium" value={props.password}
						onChange={props.changePassword}
					/>
				</dd>
			</dl>
			<div className="m-operations">
				<button className="e-square-button e-w-medium t-positive-button" onClick={props.signIn}>Sign In</button>
			</div>
		</form>
	</DialogBox>
));

export default SignInDialogView;

