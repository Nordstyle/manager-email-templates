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

const FormDialog = (props) => {
  const { modalOptions:{ open, effect }, modalHandler } = props;
  const classes = useStyles();
  return (
    <Dialog open={open}
            onClose={() => modalHandler({ type: 'close' })}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        { effect === 'add' && 'Add' }
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Category name"
          type="text"
          className={classes.input}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="parent"
          label="Category parent"
          type="text"
          className={classes.input}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary"
                onClick={() => modalHandler({ type: 'close' })} color="primary">
          Cancel
        </Button>
        <Button onClick={() => modalHandler({ type: 'close' })} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;