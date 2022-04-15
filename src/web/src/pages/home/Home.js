import React from 'react';
import { makeStyles } from '@mui/styles';
import Expenses from '../../components/expenses/Expenses';

const useStyles = makeStyles({
  home: {
    scrollBehavior: 'smooth'
  }
});

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.home}>
      <Expenses />
    </div>
  );
};

export default Home;
