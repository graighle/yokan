import React from 'react';

const SettingMenuDialogView = props => (
	<div className="l-setting-dialog m-setting-menu t-setting-menu">
		<ul className="m-menu-list t-menu-list">
			<li onClick={props.clickSignOut}>Sign out</li>
		</ul>
	</div>
);

export default SettingMenuDialogView;

