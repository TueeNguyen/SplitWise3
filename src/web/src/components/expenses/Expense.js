import { makeStyles } from '@mui/styles';
import React from 'react';
import ImgTable from './ImgTable';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1em'
  }
});

const Expense = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <ImgTable />
    </div>
  );
};

export default Expense;
