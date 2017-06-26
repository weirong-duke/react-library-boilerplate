import React from 'react';

const lanes = ['not started', 'in dev', 'qa', 'verified'];

const SwimLanes = (props) => {
	return (
		<table className="board-table">

			<thead>
				<tr>
					{lanes.map((lane, laneIndex) => <th key={laneIndex}>{lane}</th>)}
				</tr>
			</thead>
			<tbody>
				<tr>
					{lanes.map((lane, laneIndex) => <td key={laneIndex} style={{minWidth: '165px', height: '500px'}}></td>)}
				</tr>
			</tbody>

		</table>
	);
};

export default SwimLanes;
