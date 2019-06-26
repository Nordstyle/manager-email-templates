import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const EnhancedTableHead = props => {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = property => event => {
		onRequestSort(event, property);
	};
	return (
		<TableHead>
			<TableRow>
				<TableCell>
					<TableSortLabel
						active={orderBy === "id"}
						direction={order}
						onClick={createSortHandler("id")}
						sortDirection={orderBy === "id" ? order : false}
					>
						ID
					</TableSortLabel>
				</TableCell>
				<TableCell>
					<TableSortLabel
						active={orderBy === "title"}
						direction={order}
						onClick={createSortHandler("title")}
						sortDirection={orderBy === "title" ? order : false}
					>
						Title
					</TableSortLabel>
				</TableCell>
				<TableCell>
					<TableSortLabel
						active={orderBy === "parent"}
						direction={order}
						onClick={createSortHandler("parent")}
						sortDirection={orderBy === "parent" ? order : false}
					>
						Parent
					</TableSortLabel>
				</TableCell>
				<TableCell align={"right"}>Actions</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default EnhancedTableHead;
