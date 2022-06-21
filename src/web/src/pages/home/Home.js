import React from 'react';
import { makeStyles } from '@mui/styles';
import Expenses from '../../components/expenses/Expenses';

const useStyles = makeStyles({
  container: {
    scrollBehavior: 'smooth'
  }
});

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Expenses />
    </div>
  );
};

export default Home;
