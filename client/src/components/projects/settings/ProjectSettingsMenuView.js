import React from 'react';

const ProjectSettingsMenuView = props => (
	<div className="m-content-menu-items t-content-menu-items">
		{props.menuItems.map(i => (<ProjectMenuItemView key={i.key} item={i} {...props} />))}
	</div>
);

const ProjectMenuItemView = props => {
	const currentClassName = props.current === props.item.key ? 's-current' : '';

	return (
		<div className={`m-content-menu-item t-content-menu-item ${currentClassName}`}
			onClick={e => props.clickMenuItem(e, props.item)}
		>
			{props.item.text}
		</div>
	);
};

export default ProjectSettingsMenuView;

