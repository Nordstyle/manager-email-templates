import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CategoriesFields from "./Fields/Categories";
import MessagesFields from "./Fields/Messages";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  input: {
    minWidth: "400px",
    marginBottom: "16px"
  }
}));

const FieldsComponent = ({ possibleCategories, type, isRowAction, payload, validateOptions, classes }) => {
  switch (type) {
    case "category":
      return (
        <CategoriesFields
          isRowAction={isRowAction}
          payload={payload}
          validateOptions={validateOptions}
          classes={classes}
          possibleCategories={possibleCategories}
        />
      );
    case "messages":
      return (
        <MessagesFields
          isRowAction={isRowAction}
          payload={payload}
          validateOptions={validateOptions}
          classes={classes}
          possibleCategories={possibleCategories}
        />
      );
    default:
      throw new Error();
  }
};


const formHandler = (
  e,
  modalHandler,
  modalOptions,
  addMethod,
  deleteMethod,
  updateMethod
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
      modalHandler({ type: "close" });
      break;
    case "update":
      updateMethod({ id, title, parent, category, body });
      modalHandler({ type: "close" });
      break;
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
    validateOptions,
    allCategories
  } = props;
  const classes = useStyles();
  const actionTitle = effect === "add" ? "Add" : "Update";
  const isRowAction = effect === "update";
  const [possibleCategories, setPossibleCategories] = useState([]);
  const [disabled, setDisabled] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={() => modalHandler({ type: "close" })}
      onEnter={() => setPossibleCategories(allCategories)}
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
            disabled,
            setDisabled,
            isRowAction
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
          setDisabled={setDisabled}
          possibleCategories={possibleCategories}
          disabled={disabled}
        />
        <DialogActions>
          { disabled && <Typography variant="h6"> To update the field must be different </Typography>}
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