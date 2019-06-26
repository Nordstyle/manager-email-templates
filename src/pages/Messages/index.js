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
import { getMessagesSelector } from "../../store/selectors";
import Modal from "../../components/Modal";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
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

const Messages = props => {
  const {
    fetchMessagesAll,
    messages,
    isLoading,
    messagesCreate,
    messagesDelete,
    messagesUpdate
  } = props;
  const classes = useStyles();
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
    fetchMessagesAll({ page, rowsPerPage });
    return () => {
      document.title = "Email Templates Manager";
    };
  }, [page, rowsPerPage, fetchMessagesAll]);

  /* METHODS */
  const addMessages = params => {
    console.log(params, 'PARAMS')
    messagesCreate(params);
  };

  const deleteMessages = params => {
    messagesDelete(params);
  };

  const updateMessages = params => {
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
          <ButtonGroup fullWidth size={"small"} color={"primary"}>
            <Button
              onClick={() =>
                dispatchModalOptions({ type: "open", effect: "add" })
              }
            >
              Add item
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={10}>
          <Typography variant={"h6"}>List of Messages</Typography>
          <TableList
            page={page}
            setPage={setPage}
            data={messages}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            isLoading={isLoading}
            modalHandler={dispatchModalOptions}
            deleteMethod={deleteMessages}
            order={order}
            orderBy={orderBy}
            handleRequestSort={handleRequestSort}
          />
        </Grid>
      </Grid>
      <Modal
        modalHandler={dispatchModalOptions}
        modalOptions={modalOptions}
        addMethod={addMessages}
        updateMethod={updateMessages}
      />
    </div>
  );
};

export default connect(
  store => ({
    messages: getMessagesSelector(store),
    isLoading: store.messages.isLoading
  }),
  { fetchMessagesAll, messagesCreate, messagesDelete, messagesUpdate }
)(Messages);
