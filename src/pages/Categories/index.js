import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { fetchCategoryAll } from "../../store/actions/categories";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TableList from "../../components/Table";
import { getCategoriesSelector } from "../../store/selectors";
import Modal from '../../components/Modal';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  }
}));

const modalReducer = (state, action) => {
  switch (action.type) {
    case 'open':
      return { open: true, effect: action.effect };
    case 'close':
      return { open: false, effect: undefined };
    default:
      throw new Error();
  }
};

const Categories = (props) => {
  const { fetchCategoryAll, categories, isLoading } = props;
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [modalOptions, dispatchModalOptions] = useReducer(modalReducer, {
    open: false,
    type: undefined
  });

  useEffect(() => {
    document.title = 'Categories page';
    fetchCategoryAll({ page, rowsPerPage });
    return () => {
      document.title = 'Email Templates Manager';
    }
  }, [page, rowsPerPage, fetchCategoryAll]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Typography variant={'h6'}>
            Actions
          </Typography>
          <ButtonGroup fullWidth color={'primary'}>
            <Button onClick={() => dispatchModalOptions({ type: 'open', effect: 'add' })}>
              Add item
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={10}>
          <Typography variant={'h6'}>
            List of Categories
          </Typography>
          <TableList page={page}
                     setPage={setPage}
                     data={categories}
                     rowsPerPage={rowsPerPage}
                     setRowsPerPage={setRowsPerPage}
                     isLoading={isLoading}/>
        </Grid>
      </Grid>
      <Modal modalHandler={dispatchModalOptions}
             modalOptions={modalOptions}/>
    </div>
  );
};

export default connect(
  store => ({ categories: getCategoriesSelector(store), isLoading: store.categories.isLoading }),
  { fetchCategoryAll }
)(Categories);
