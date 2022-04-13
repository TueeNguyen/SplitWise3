import React from 'react';
import { makeStyles } from '@mui/styles';
import Expenses from '../../components/expenses/Expenses';

const useStyles = makeStyles({
  home: {}
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
