import React from 'react';
import SettingMenuDialog from './SettingMenuDialog';
import SignInDialog from './SignInDialog';

const baseZIndex = 100;

const transparentOverlayDialogs = [
	'setting_menu',
];

const DialogRendererView = props => (
	<div className="l-dialog-layers"
		style={{
			'visibility': (props.visible ? 'visible' : 'hidden'),
			'zIndex': baseZIndex,
		}}
	>
		{props.dialogs.map((d, i) => (<DialogView key={d.id} index={i} dialog={d} {...props} />))}
	</div>
);

const DialogView = props => {

	const { index, dialog, } = props;

	let overlayClassName = 'l-overlay';
	if(!transparentOverlayDialogs.includes(dialog.type))
		overlayClassName += ' t-dialog-overlay';

	return (
		<>
			<div className={overlayClassName} style={{'zIndex': baseZIndex + index * 2}}
				onClick={e => props.clickOverlay(e, dialog.id)}
			/>
			<div className="l-dialog-frame" style={{'zIndex': baseZIndex + index * 2 + 1}} >
				{dialog.type === 'setting_menu' ? <SettingMenuDialog options={dialog.options} /> : null}
				{dialog.type === 'sign_in' ? <SignInDialog options={dialog.options} /> : null}
			</div>
		</>
	);
};

export default DialogRendererView;

