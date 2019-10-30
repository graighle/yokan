import React from 'react';

const DashboardView = props => (
	<div className="m-content-area">
		<div className="m-content-title">
			Dashboard
		</div>
		<div className="m-content-body m-section">
			<div className="m-section-header">
				Projects
			</div>
			<div className="m-section-ops">
				<div className="m-ops-left">
				</div>
				<div className="m-ops-right">
					<button className="e-square-button t-positive-button">New Project</button>
				</div>
			</div>
			<div className="m-section-body">
				<ProjectListView {...props} />
			</div>
		</div>
	</div>
);

const ProjectListView = props => (
	<>
		<table className="e-list t-project-list">
			<thead>
				<tr>
					<th className="e-project-name">Project</th>
				</tr>
			</thead>
			<tbody>
				{props.projects.map(p => <ProjectListItemView key={p.id} project={p} {...props} />)}
			</tbody>
		</table>
	</>
);

const ProjectListItemView = props => (
	<tr>
		<td>
			{props.project.name}
		</td>
	</tr>
);

export default DashboardView;

