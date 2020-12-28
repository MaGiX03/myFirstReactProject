import React from "react";

const TableRow = props => (
	
	<tr>
		<td team_id={props.club.team_id} onClick={props.getMatches} className="clubName">{props.club.name}</td>

		<td>{props.club.matches}</td>
		<td>{props.club.won}</td>
		<td>{props.club.drawn}</td>
		<td>{props.club.lost}</td>
		<td>{props.club.goals_scored}</td>
		<td>{props.club.goals_conceded}</td>
		<td>{props.club.goal_diff}</td>
		<td>{props.club.points}</td>
	
	</tr>

	)

export default TableRow;