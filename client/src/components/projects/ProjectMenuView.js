import React from 'react';

const ProjectMenuView = props => (
	<div>
		<div className="m-project-menu-tabs t-project-menu-tabs">
			{props.tabList.map(t => (<ProjectTabView key={t.key} tab={t} {...props} />))}
		</div>
	</div>
);

const ProjectTabView = props => {
	const currentClassName = props.currentTab === props.tab.key ? 's-current' : '';

	return (
		<div className={`m-project-menu-tab t-project-menu-tab ${currentClassName}`}
			onClick={e => props.clickTab(e, props.tab)}
		>
			{props.tab.text}
		</div>
	);
};

export default ProjectMenuView;

