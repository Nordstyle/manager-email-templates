import React, { useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Edit from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import TooltipAlert from "./TooltipAlert";
import EnhancedTableHead from "./TableHead";
import TablePaginationActions from "./TablePagination";
import { getSorting, stableSort } from "../../utils";

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
	/* TODO: refactor datadatadata */
	const {
		page,
		setPage,
		data: {
			data: { data }
		},
		rowsPerPage,
		setRowsPerPage,
		isLoading,
		modalHandler,
		order,
		orderBy,
		handleRequestSort,
		deleteMethod
	} = props;
	const totalCount = props.data.data.count;
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
							data &&
							stableSort(data, getSorting(order, orderBy)).map(item => {
								const { id, parent, title, children, messages } = item;
								const parentId = parent ? parent.id : null;
								const hasDeps = children || messages ? !!children.length || !!messages.length : null;
								return (
									<TableRow hover key={id}>
										<TableCell component="th" scope="row">
											{id}
										</TableCell>
										<TableCell>{title}</TableCell>
										<TableCell>{parentId}</TableCell>
										<TableCell>{messages ? messages.length : null}</TableCell>
										<TableCell align={"right"}>
											<IconButton
												onClick={() =>
													modalHandler({
														type: "open",
														effect: "update",
														payload: { id, parent, title }
													})
												}
											>
												<Edit />
											</IconButton>
											<ClickAwayListener
												onClickAway={() => setOpenTooltip({ type: "close" })}
											>
                        <span>
                          <Tooltip
														PopperProps={{
															disablePortal: true
														}}
														onClose={() => setOpenTooltip({ type: "close" })}
														open={openTooltip.openId === id}
														disableFocusListener
														disableHoverListener
														disableTouchListener
														interactive
														title={
															<>
																<TooltipAlert
																	id={id}
																	deleteMethod={deleteMethod}
																	setOpenTooltip={setOpenTooltip}
																/>
															</>
														}
													>
                            <IconButton
															onClick={() =>
																hasDeps
																	? setOpenTooltip({ type: "open", openId: id })
																	: deleteMethod({ id })
															}
														>
                              <DeleteForever />
                            </IconButton>
                          </Tooltip>
                        </span>
											</ClickAwayListener>
										</TableCell>
									</TableRow>
								);
							})
						)}
					</TableBody>
					{!isLoading && data && (
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25]}
									colSpan={3}
									count={totalCount}
									rowsPerPage={rowsPerPage}
									page={page}
									SelectProps={{
										inputProps: { "aria-label": "Rows per page" },
										native: true
									}}
									onChangePage={handleChangePage}
									onChangeRowsPerPage={handleChangeRowsPerPage}
									ActionsComponent={TablePaginationActions}
								/>
							</TableRow>
						</TableFooter>
					)}
				</Table>
			</Paper>
		</div>
	);
};

export default TableList;
