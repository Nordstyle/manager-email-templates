import React, { useState, useEffect, useReducer } from "react";
import { connect } from "react-redux";
import {
  fetchMessagesAll,
  messagesCreate,
  messagesDelete,
  messagesUpdate
} from "../../store/actions/messages";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TableList from "../../components/Table";
import {getAllCategories, getMessagesSelector} from "../../store/selectors";
import Modal from "../../components/Modal";
import {createNormalizeDataMessages} from "../../utils";
import CircularProgress from "@material-ui/core/CircularProgress";
import {fetchCategoryAll} from "../../store/actions/categories";
import TextField from "@material-ui/core/TextField";
import { useFilter } from "../../hooks";

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
  {id: 'body', numeric: false, disablePadding: false, label: 'Body'},
  {id: 'category', numeric: true, disablePadding: false, label: 'Category ID'}
];


const Categories = props => {
  const {
    fetchMessagesAll,
    messages,
    isLoading,
    messagesCreate,
    messagesDelete,
    messagesUpdate,
    allCategories,
    fetchCategoryAll
  } = props;
  const classes = useStyles();
  const [state] = useState({
    type: 'messages',
    validateOptions: {
      titleLength: 1024
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
    document.title = "Messages page";
    if (!allCategories.length) {
      fetchCategoryAll();
    }
    fetchMessagesAll();
    return () => {
      document.title = "Email Templates Manager";
    };
  }, [fetchMessagesAll, fetchCategoryAll, allCategories.length]);

  /* TODO: refactor datadatadata */
  const rows = (messages.data.data || []).map(item => {
    return createNormalizeDataMessages(item.id, item.title, item.body, item.category)
  });

  const [filteredRows, filter, setFilter] = useFilter(rows, ['title', 'category']);

  const totalCount = messages.data ? messages.data.count : 0;

  /* METHODS */
  const addCategory = params => {
    messagesCreate(params);
  };

  const deleteCategory = params => {
    messagesDelete(params);
  };

  const updateCategory = params => {
    messagesUpdate(params);
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
            <Button
              onClick={() => dispatchModalOptions({ type: "open", effect: "add" })}>
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
          <Typography variant={"h6"}>List of Messages {isLoading && <CircularProgress size={20}/>}</Typography>
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
        allCategories={allCategories}
        type={state.type}
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
    messages: getMessagesSelector(store),
    allCategories: getAllCategories(store),
    isLoading: store.messages.isLoading
  }),
  { fetchMessagesAll, fetchCategoryAll, messagesCreate, messagesDelete, messagesUpdate }
)(Categories);
