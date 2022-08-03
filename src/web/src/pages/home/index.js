import React from 'react';
import { makeStyles } from '@mui/styles';
import { ExpenseList } from '../../features/expense';

const useStyles = makeStyles({
  container: {
    scrollBehavior: 'smooth'
  }
});

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <ExpenseList />
    </div>
  );
};

export default Home;
