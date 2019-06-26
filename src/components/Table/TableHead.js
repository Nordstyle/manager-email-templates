import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const EnhancedTableHead = props => {
	const { order, orderBy, onRequestSort, rowHeads } = props;
	const createSortHandler = property => event => {
		onRequestSort(event, property);
	};
	return (
		<TableHead>
			<TableRow>
				{rowHeads.map(row => (
					<TableCell
						key={row.id}
						align={row.numeric ? 'right' : 'left'}
						padding={row.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === row.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === row.id}
							direction={order}
							onClick={createSortHandler(row.id)}
						>
							{row.label}
						</TableSortLabel>
					</TableCell>
				))}
				<TableCell align={"right"}>Actions</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default EnhancedTableHead;
