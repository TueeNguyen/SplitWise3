import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  conatiner: {
    scrollBehavior: 'smooth'
  }
});

const Search = () => {
  const classes = useStyles();
  return <div className={classes.container}>Hi</div>;
};

export default Search;
