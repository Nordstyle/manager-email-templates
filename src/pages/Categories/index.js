import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TableList from "../../components/Table";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  }
}));

const Categories = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Typography variant={'h6'}>
            Actions
          </Typography>
          <ButtonGroup fullWidth color={'primary'}>
            <Button>
              Add item
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={10}>
          <Typography variant={'h6'}>
            List of Categories
          </Typography>
          <TableList />
        </Grid>
      </Grid>
    </div>
  );
};

export default Categories;