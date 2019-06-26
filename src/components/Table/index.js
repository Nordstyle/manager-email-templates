import React, { useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import EnhancedTableHead from "./TableHead";
import { getSorting, stableSort } from "../../utils";
import TableRowCategory from "./TableRowCategory";
import CustomTableFooter from "./TableFooter";

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%"
	},
	paper: {
		marginTop: theme.spacing(3),
		width: "100%",
		overflowX: "auto",
		marginBottom: theme.spacing(2)
	},
	table: {
		minWidth: 650
	},
	loader: {
		width: "100%",
		textAlign: "center",
		padding: "20px"
	}
}));

const tooltipReducer = (state, action) => {
	switch (action.type) {
		case "open":
			return { openId: action.openId };
		case "close":
			return { openId: undefined };
		default:
			throw new Error();
	}
};

const TableList = props => {
	const {
		rowHeads,
		rows,
		totalCount,
		page,
		setPage,
		rowsPerPage,
		setRowsPerPage,
		isLoading,
		modalHandler,
		order,
		orderBy,
		handleRequestSort,
		deleteMethod
	} = props;
	const [openTooltip, setOpenTooltip] = useReducer(tooltipReducer, {
		openId: undefined
	});
	const classes = useStyles();

	/* METHODS */
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
	};

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Table className={classes.table} size="small">
					<EnhancedTableHead
						rowHeads={rowHeads}
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
					/>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell
									className={classes.loader}
									component="th"
									scope="row"
								>
									<CircularProgress />
								</TableCell>
							</TableRow>
						) : (
							rows && rows.length > 0 &&
							stableSort(rows, getSorting(order, orderBy)).map(row => {
								const hasDeps = !!row.children || !!row.messages;
								return (
									<TableRowCategory
										key={row.id}
										row={row}
										hasDeps={hasDeps}
										modalHandler={modalHandler}
										setOpenTooltip={setOpenTooltip}
										openTooltip={openTooltip}
										deleteMethod={deleteMethod}
									/>
								)
							})
						)}
					</TableBody>
					{!isLoading && rows && rows.length > 0 && (
						<CustomTableFooter
							count={totalCount}
							rowsPerPage={rowsPerPage}
							page={page}
							handleChangePage={handleChangePage}
							handleChangeRowsPerPage={handleChangeRowsPerPage}/>
					)}
				</Table>
			</Paper>
		</div>
	);
};

export default TableList;
