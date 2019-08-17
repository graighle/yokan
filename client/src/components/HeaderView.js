import React from 'react';
import { IconContext } from 'react-icons';
import { MdSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';

const HeaderView = props => (
	<div className="l-header m-page-header t-page-header">
		<div className="m-app-title">
			<Link to="/" className="e-app-title-link">Yokan</Link>
		</div>
		<div className="m-space">
		</div>
		<div className="m-user">
			{props.signInUser ? props.signInUser.id : null}
		</div>
		<div className="m-options">
			{props.signInUser ? (
				<IconContext.Provider value={{ className: 'e-setting-icon' }}>
					<MdSettings />
				</IconContext.Provider>
			) : (
				<button className="e-square-button t-action-button" onClick={props.openSignInDialog}>Sign In</button>
			)}
		</div>
	</div>
);

export default HeaderView;

