import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CategoriesFields from "./Fields/Categories";
import MessagesFields from "./Fields/Messages";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles(() => ({
  input: {
    minWidth: "400px",
    marginBottom: "16px"
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
  const parent = form.parent ? form.parent.value : null;
  const category = form.category ? form.category.value : null;
  const body = form.body ? form.body.value : null;

  switch (effect) {
    case "add":
      addMethod({ title, parent, category, body });
      break;
    case "update":
      updateCategory({ id, title, parent, category, body });
      break;
    default:
      modalHandler({ type: "close" });
  }

  modalHandler({ type: "close" });
};

const FieldsComponent = ({ type, isRowAction, payload, validateOptions, classes }) => {
  switch (type) {
    case "category":
      return (
        <CategoriesFields
          isRowAction={isRowAction}
          payload={payload}
          validateOptions={validateOptions}
          classes={classes}
        />
      );
    case "messages":
      return (
        <MessagesFields
          isRowAction={isRowAction}
          payload={payload}
          validateOptions={validateOptions}
          classes={classes}
        />
      );
    default:
      throw new Error();
  }
};

const FormDialog = props => {
  const {
    type,
    modalOptions: { open, effect, payload },
    modalHandler,
    addMethod,
    deleteMethod,
    updateMethod,
    validateOptions
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
        <FieldsComponent
          type={type}
          classes={classes}
          isRowAction={isRowAction}
          validateOptions={validateOptions}
          payload={payload}
        />
        <DialogActions>
          <ButtonGroup variant="contained" color="primary">
            <Button
              variant="contained"
              color="primary"
              onClick={() => modalHandler({ type: "close" })}
            >
              Cancel
            </Button>
            <Button type="submit">{actionTitle}</Button>
          </ButtonGroup>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialog;
