import React from "react";
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
  const actionTitle = effect === "add" ? "Add" : "Update";
  const isRowAction = effect === "update";
  return (
    <Dialog
      open={open}
      onClose={() => modalHandler({ type: "close" })}
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
            updateMethod
          )
        }
      >
        <DialogTitle id="form-dialog-title">{actionTitle}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="title"
            label='Title'
            defaultValue={isRowAction ? payload.title : ""}
            type="text"
            required
            inputProps={{ maxLength: 255 }}
            className={classes.input}
            fullWidth
          />
          <TextField
            margin="dense"
            id="parent"
            label="Parent id"
            defaultValue={isRowAction ? payload.parent : ""}
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
