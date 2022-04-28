import React from 'react';
import { makeStyles } from '@mui/styles';
import ExpenseCards from '../../components/expenses/ExpenseCards';

const useStyles = makeStyles({
  container: {
    scrollBehavior: 'smooth'
  }
});

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <ExpenseCards />
    </div>
  );
};

export default Home;
