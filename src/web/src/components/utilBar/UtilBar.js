import React from 'react';
import SortButton from './sortButton/SortButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { IconButton, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory, useLocation } from 'react-router-dom';
import SearchBar from './searchBar/SearchBar';
import UserButton from './userButton/UserButton';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '10px',
    margin: '10px 10px 0px'
  },
  tooltip: {
    fontSize: '1rem'
  }
}));

const UtilBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  const renderBasedOnPathname = () => {
    if (pathname === '/search') {
      return <SearchBar />;
    }
    if (pathname.match('/expense/w*')) {
      return (
        <>
          <UserButton />
          <Tooltip title="Search" placement="left">
            <IconButton onClick={() => history.push('/search')}>
              <SearchRoundedIcon />
            </IconButton>
          </Tooltip>
        </>
      );
    }
    return (
      <Tooltip title="Search" placement="left">
        <IconButton onClick={() => history.push('/search')}>
          <SearchRoundedIcon />
        </IconButton>
      </Tooltip>
    );
  };
  return (
    <div className={classes.container}>
      {renderBasedOnPathname()}
      <SortButton />
    </div>
  );
};

export default UtilBar;
