import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles(() => ({
  input: {
    minWidth: "400px",
    marginBottom: "10px"
  }
}));

const formHandler = (
  e,
  modalHandler,
  modalOptions,
  addMethod,
  deleteMethod,
  updateCategory
) => {
  e.preventDefault();
  const { effect, payload } = modalOptions;
  const id = payload ? payload.id : undefined;
  const form = e.target;
  const title = form.title.value;
  const parent = form.parent.value;

  switch (effect) {
    case "add":
      addMethod({ title, parent });
      break;
    case "update":
      updateCategory({ id, title, parent });
      break;
    default:
      modalHandler({ type: "close" });
  }

  modalHandler({ type: "close" });
};

const FormDialog = props => {
  const {
    modalOptions: { open, effect, payload },
    modalHandler,
    addMethod,
    deleteMethod,
    updateMethod
  } = props;
  const classes = useStyles();
  const [validate, setValidate] = useState({ length: true, update: true });
  const actionTitle = effect === "add" ? "Add" : "Update";
  const isRowAction = effect === "update";
  return (
    <Dialog
      open={open}
      onClose={() => modalHandler({ type: "close" })}
      onEnter={() =>
        isRowAction
          ? setValidate({ length: true, update: false })
          : setValidate({ length: true, update: true })
      }
      aria-labelledby="form-dialog-title"
      transitionDuration={0}
    >
      <form
        onSubmit={e =>
          formHandler(
            e,
            modalHandler,
            { effect, payload },
            addMethod,
            deleteMethod,
            updateMethod,
            validate
          )
        }
      >
        <DialogTitle id="form-dialog-title">{actionTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label={
              !validate.length
                ? "Maximum string length 250 characters"
                : "Title"
            }
            defaultValue={isRowAction ? payload.title : ""}
            type="text"
            required
            className={classes.input}
            onChange={e => {
              if (e.target.value.length >= 250) {
                setValidate({ ...validate, length: false });
              } else if (isRowAction && e.target.value === payload.title) {
                setValidate({ ...validate, update: false });
              } else {
                setValidate({ length: true, update: true });
              }
            }}
            fullWidth
          />
          <TextField
            margin="dense"
            id="parent"
            label="Parent id"
            defaultValue={isRowAction ? payload.id : ""}
            type="number"
            className={classes.input}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <ButtonGroup variant="contained" color="primary">
            <Button
              variant="contained"
              color="primary"
              onClick={() => modalHandler({ type: "close" })}
            >
              Cancel
            </Button>
            <Button
              disabled={!validate.length || !validate.update}
              type="submit"
            >
              {actionTitle}
            </Button>
          </ButtonGroup>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialog;
