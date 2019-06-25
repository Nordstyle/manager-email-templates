import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import CircularProgress from '@material-ui/core/CircularProgress';
import { TablePaginationActions } from './TablePagination';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	paper: {
		marginTop: theme.spacing(3),
		width: '100%',
		overflowX: 'auto',
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 650,
	},
	loader: {
		width: '100%',
		textAlign: 'center',
		padding: '20px'
	}
}));

const TableList = (props) => {
	/* TODO: refactor datadatadata */
	const { page, setPage, data:{data:{data}}, rowsPerPage, setRowsPerPage, isLoading } = props;
	const totalCount = props.data.data.count;

	const classes = useStyles();

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
	};

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Table className={classes.table} size="small">
					<TableHead>
						<TableRow>
							<TableCell padding={'checkbox'}>ID</TableCell>
							<TableCell>Title</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{isLoading ?
							(<TableRow>
								<TableCell className={classes.loader} component="th" scope="row">
									<CircularProgress/>
								</TableCell>
							</TableRow>)
						: data && data.map(item => (
							<TableRow hover key={item.id}>
								<TableCell component="th" scope="row">
									{item.id}
								</TableCell>
								<TableCell>{item.title}</TableCell>
							</TableRow>
						))}
					</TableBody>
					{ !isLoading && data && (
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25]}
									colSpan={3}
									count={totalCount}
									rowsPerPage={rowsPerPage}
									page={page}
									SelectProps={{
										inputProps: { 'aria-label': 'Rows per page' },
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