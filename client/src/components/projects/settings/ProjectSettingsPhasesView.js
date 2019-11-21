import React from 'react';
import { IconContext } from 'react-icons';
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdRemove } from 'react-icons/md';

const ProjectSettingsPhasesView = props => (
	<div className="m-section">
		<div className="m-section-header">
			Phases
			<div className="m-header-ops">
				{props.isEdit ? null : <button className="e-decisive-button t-positive-button" onClick={props.clickEditPhases}>Edit</button>}
			</div>
		</div>
		<div className="m-section-body">
			{props.phases ? <PhaseTableView {...props} /> : null}
		</div>
		{
			props.isEdit ? (
				<div className="l-split-lr m-operations">
					<div>
						<button className="e-interactive-button t-positive-button" onClick={props.clickAddPhase}>Add Phase</button>
					</div>
					<div className="m-h-buttons">
						<button className="e-decisive-button t-negative-button" onClick={props.clickCancelPhases}>Cancel</button>
						<button className="e-decisive-button t-positive-button" onClick={props.clickSavePhases}>Save</button>
					</div>
				</div>
			) : null
		}
	</div>
);

const PhaseTableView = props => (
	<table className="e-list t-simple-list">
		<thead>
			<tr>
				{props.isEdit ? (<th></th>) : null}
				{props.isEdit ? (<th></th>) : null}
				{props.isEdit ? (<th></th>) : null}
				<th>Phase</th>
			</tr>
		</thead>
		<tbody>
			{
				props.isEdit ?
					props.phases.map(p => <PhaseRowEditView key={p.id} phase={p} {...props} />)
				:
					props.phases.map(p => <PhaseRowReadView key={p.id} phase={p} {...props} />)
			}
		</tbody>
	</table>
);

const PhaseRowEditView = props => {
	const isFirst = props.phase.id === props.phases[0].id;
	const isLast = props.phase.id === props.phases[props.phases.length - 1].id;

	return (
		<>
			<tr>
				<td className="e-no-right-padding">
					<RemoveIcon onClick={e => props.clickRemove(e, props.phase.id)} />
				</td>
				<td className="e-no-right-padding">
					{!isFirst ? <UpArrowIcon onClick={e => props.clickMoveUp(e, props.phase.id)} /> : null }
				</td>
				<td className="e-no-left-padding">
					{!isLast ? <DownArrowIcon onClick={e => props.clickMoveDown(e, props.phase.id)} /> : null}
				</td>
				<td>
					<input type="text" value={props.phase.name} className="e-w-medium" onChange={
						e => props.changePhaseName(e, props.phase.id)
					} />
				</td>
			</tr>
		</>
	);
};

const PhaseRowReadView = props => {
	return (
		<>
			<tr>
				<td>
					{props.phase.name}
				</td>
			</tr>
		</>
	);
};

const UpArrowIcon = props => (
	<IconContext.Provider value={{ className: 'e-interactive-icon' }}>
		<MdKeyboardArrowUp onClick={props.onClick} />
	</IconContext.Provider>
);

const DownArrowIcon = props => (
	<IconContext.Provider value={{ className: 'e-interactive-icon' }}>
		<MdKeyboardArrowDown onClick={props.onClick} />
	</IconContext.Provider>
);

const RemoveIcon = props => (
	<IconContext.Provider value={{ className: 'e-interactive-icon t-dangerous-icon' }}>
		<MdRemove onClick={props.onClick} />
	</IconContext.Provider>
);

export default ProjectSettingsPhasesView;

