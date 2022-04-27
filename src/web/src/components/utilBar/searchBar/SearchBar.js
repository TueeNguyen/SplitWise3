import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
const useStyles = makeStyles((theme) => ({
  searchBar: {
    marginLeft: 'auto',
    display: 'flex',
    transform: 'translate(40px)'
  },
  searchInput: {
    width: '50vw',
    fontSize: theme.app.fontSize,
    padding: '0.5rem',
    borderRadius: '20px',
    border: 'solid 1px'
  },
  searchButton: {
    borderRadius: '20px',
    transform: 'translate(-97%) scale(0.8)'
  },
  [theme.breakpoints.down('md')]: {
    searchBar: {
      marginLeft: '0',
      transform: 'translate(0)'
    }
  }
}));

const SearchBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.searchBar}>
      <form>
        <input placeholder="Search for expense card(s)" className={classes.searchInput} />
      </form>
      <Button className={classes.searchButton} variant="contained">
        <SearchOutlinedIcon />
      </Button>
    </div>
  );
};

export default SearchBar;
