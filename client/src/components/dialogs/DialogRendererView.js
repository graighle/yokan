import React from 'react';
import SignInDialog from './SignInDialog';

const baseZIndex = 100;

const DialogRendererView = props => (
	<div className="l-dialog-layers"
		style={{
			'visibility': (props.visible ? 'visible' : 'hidden'),
			'zIndex': baseZIndex,
		}}
	>
		{props.dialogs.map((d, i) => (<DialogView key={d.id} index={i} dialog={d} />))}
	</div>
);

const DialogView = ({index, dialog}) => (
	<>
		<div className="l-overlay t-dialog-overlay" style={{'zIndex': baseZIndex + index * 2}}
			onClick={dialog.options.onClickOverlay}
		/>
		<div className="l-dialog-frame" style={{'zIndex': baseZIndex + index * 2 + 1}} >
			{dialog.type === 'sign_in' ? <SignInDialog options={dialog.options} /> : null}
		</div>
	</>
);

export default DialogRendererView;

