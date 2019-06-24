import React from 'react';
import {Link as RouterLink} from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles({
  root: {
    margin: '20px 0'
  }
});

const RouterButtons = (props) => {
  const classes = useStyles(props);
  return (
    <Grid className={classes.root} container>
      <ButtonGroup fullWidth color={'primary'}>
        <Button component={RouterLink} to='/categories'> Categories </Button>
        <Button component={RouterLink} to='/messages'> Messages </Button>
      </ButtonGroup>
    </Grid>
  );
};

export default RouterButtons;