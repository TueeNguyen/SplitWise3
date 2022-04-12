import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  home: {
    height: '200vh'
  }
});

const Home = () => {
  const classes = useStyles();
  return <div className={classes.home}>Home</div>;
};

export default Home;
