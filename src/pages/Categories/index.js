import React, { useState, useEffect, useReducer } from "react";
import { connect } from "react-redux";
import {
  fetchCategoryAll,
  categoryCreate,
  categoryDelete,
  categoryUpdate
} from "../../store/actions/categories";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TableList from "../../components/Table";
import {getAllCategories, getCategoriesSelector} from "../../store/selectors";
import Modal from "../../components/Modal";
import {createNormalizeDataCategory} from "../../utils";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import {useFilter} from "../../hooks";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  buttonGroup: {
    marginBottom: '20px'
  }
}));

const modalReducer = (state, action) => {
  switch (action.type) {
    case "open":
      return { open: true, effect: action.effect, payload: action.payload };
    case "close":
      return { open: false, effect: undefined, payload: undefined };
    default:
      throw new Error();
  }
};

const rowHeads = [
  {id: 'id', numeric: false, disablePadding: false, label: 'id'},
  {id: 'title', numeric: false, disablePadding: false, label: 'Title'},
  {id: 'parent', numeric: true, disablePadding: false, label: 'Parent ID'},
  {id: 'messages', numeric: true, disablePadding: false, label: 'Messages count'}
];


const Categories = props => {
  const {
    fetchCategoryAll,
    categories,
    allCategories,
    isLoading,
    categoryCreate,
    categoryDelete,
    categoryUpdate
  } = props;
  const classes = useStyles();
  const [state] = useState({
    type: 'category',
    validateOptions: {
      titleLength: 255
    }
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [modalOptions, dispatchModalOptions] = useReducer(modalReducer, {
    open: false,
    effect: undefined,
    payload: undefined
  });

  useEffect(() => {
    document.title = "Categories page";
    fetchCategoryAll();
    return () => {
      document.title = "Email Templates Manager";
    };
  }, [fetchCategoryAll]);

  /* TODO: refactor datadatadata */
  const rows = (categories.data.data || []).map(item => {
    return createNormalizeDataCategory(item.id, item.title, item.parent, item.messages, item.children)
  });

  const [filteredRows, filter, setFilter] = useFilter(rows, ['title', 'parent', 'messages']);

  const totalCount = categories.data ? categories.data.count : 0;

  /* METHODS */
  const addCategory = params => {
    categoryCreate(params);
  };

  const deleteCategory = params => {
    categoryDelete(params);
  };

  const updateCategory = params => {
    categoryUpdate(params);
  };

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Typography variant={"h6"}>Actions</Typography>
          <ButtonGroup className={classes.buttonGroup} fullWidth size={"small"} color={"primary"}>
            <Button onClick={() => dispatchModalOptions({ type: "open", effect: "add" })}>
              Add item
            </Button>
          </ButtonGroup>
          <TextField
            id="standard-full-width"
            label="Filtered"
            style={{ margin: 8 }}
            placeholder="Enter filter text..."
            value={filter}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => setFilter(e.target.value)}
          />
        </Grid>
        <Grid item xs={10}>
          <Typography variant={"h6"}>List of Categories {isLoading && <CircularProgress size={20} />}</Typography>
          <TableList
            type={state.type}
            rowHeads={rowHeads}
            rows={filteredRows}
            page={page}
            setPage={setPage}
            totalCount={totalCount}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            isLoading={isLoading}
            modalHandler={dispatchModalOptions}
            deleteMethod={deleteCategory}
            order={order}
            orderBy={orderBy}
            handleRequestSort={handleRequestSort}
          />
        </Grid>
      </Grid>
      <Modal
        key={(modalOptions.payload || {}).id}
        type={state.type}
        allCategories={allCategories}
        validateOptions={state.validateOptions}
        modalHandler={dispatchModalOptions}
        modalOptions={modalOptions}
        addMethod={addCategory}
        updateMethod={updateCategory}
      />
    </div>
  );
};

export default connect(
  store => ({
    categories: getCategoriesSelector(store),
    allCategories: getAllCategories(store),
    isLoading: store.categories.isLoading
  }),
  { fetchCategoryAll, categoryCreate, categoryDelete, categoryUpdate }
)(Categories);
