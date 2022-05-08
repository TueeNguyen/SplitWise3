import { makeStyles } from '@mui/styles';
import React from 'react';
import ImgTable from './ImgTable';
import DivisionTable from './DivisionTable';
import ReceiptTable from './ReceiptTable';

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
      <ReceiptTable />
      <DivisionTable />
    </div>
  );
};

export default Expense;
