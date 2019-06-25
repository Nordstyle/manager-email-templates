import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles(() => ({
  input: {
    minWidth: '400px',
    marginBottom: '10px'
  }
}));

const formHandler = (e, modalHandler, modalOptions, addMethod, deleteMethod) => {
  e.preventDefault();
  const { effect, payload: { id } } = modalOptions;
  const form = e.target;
  const title = form.title.value;
  const parent = form.parent.value;

  switch (effect) {
    case 'add':
      addMethod({ title, parent });
      break;
    case 'actions':
      deleteMethod({ id });
      break;
    default: modalHandler({ type: 'close' });
  }

  modalHandler({ type: 'close' });
};

const FormDialog = (props) => {
  const { modalOptions:{ open, effect, payload }, modalHandler, addMethod, deleteMethod } = props;
  const classes = useStyles();
  return (
    <Dialog open={open}
            onClose={() => modalHandler({ type: 'close' })}
            aria-labelledby="form-dialog-title">
      <form onSubmit={(e) => formHandler(e, modalHandler, { effect, payload }, addMethod, deleteMethod)}>
        <DialogTitle id="form-dialog-title">
          { effect === 'add' && 'Add' }
          { effect === 'actions' && 'Row actions' }
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Category title"
            defaultValue={ effect === 'actions' ? payload.title : '' }
            type="text"
            required
            className={classes.input}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="parent"
            label="Category parent id"
            defaultValue={effect === 'actions' ? payload.id : ''}
            type="number"
            className={classes.input}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <ButtonGroup
            variant="contained"
            color="primary"
          >
            <Button variant="contained" color="primary"
                    onClick={() => modalHandler({ type: 'close' })}>
              Cancel
            </Button>
            { effect === 'actions' ? (
              <Button type='submit'>
                Delete
              </Button>
            ) : (
              <Button type='submit'>
                Add
              </Button>
            )}
          </ButtonGroup>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialog;