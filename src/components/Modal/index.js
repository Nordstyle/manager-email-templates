import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  input: {
    minWidth: '400px',
    marginBottom: '10px'
  }
}));

const formHandler = (e, modalHandler, actionHandler) => {
  e.preventDefault();
  const form = e.target;
  const title = form.title.value;
  const parent = form.parent.value;
  actionHandler({ title, parent });
  modalHandler({ type: 'close' });
};

const FormDialog = (props) => {
  const { modalOptions:{ open, effect }, modalHandler, addMethod } = props;
  const classes = useStyles();
  return (
    <Dialog open={open}
            onClose={() => modalHandler({ type: 'close' })}
            aria-labelledby="form-dialog-title">
      <form onSubmit={(e) => formHandler(e, modalHandler, addMethod)}>
        <DialogTitle id="form-dialog-title">
          { effect === 'add' && 'Add' }
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Category title"
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
            type="number"
            className={classes.input}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary"
                  onClick={() => modalHandler({ type: 'close' })}>
            Cancel
          </Button>
          <Button type='submit' color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialog;