import React from 'react';
import SortButton from './sortButton/SortButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { IconButton, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory, useLocation } from 'react-router-dom';
import SearchBar from './searchBar/SearchBar';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: '10px 10px 0px'
  },
  tooltip: {
    fontSize: '1rem'
  }
}));

const UtilBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  return (
    <div className={classes.container}>
      {location.pathname === '/search' ? (
        <SearchBar />
      ) : (
        <Tooltip title="Search" placement="left">
          <IconButton onClick={() => history.push('/search')}>
            <SearchRoundedIcon />
          </IconButton>
        </Tooltip>
      )}

      <SortButton />
    </div>
  );
};

export default UtilBar;
