import React from 'react';
import SortButton from './sortButton/SortButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { IconButton, Tooltip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { makeStyles } from '@mui/styles';
import { useHistory, useLocation } from 'react-router-dom';
import SearchBar from './searchBar/SearchBar';
import UserButton from './userButton/UserButton';
import axiosInstance from '../../axios/axios';

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
  const renderSearch = () => <SearchBar />;
  const renderExpense = () => (
    <>
      <UserButton />
      <Tooltip title="Search" placement="bottom-start">
        <IconButton onClick={() => history.push('/search')}>
          <SearchRoundedIcon />
        </IconButton>
      </Tooltip>
    </>
  );
  const renderHome = () => (
    <>
      <Tooltip title="Search" placement="bottom-start">
        <IconButton onClick={() => history.push('/search')}>
          <SearchRoundedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add an expense" placement="left-end">
        <IconButton
          onClick={() =>
            axiosInstance.post('/expense/create', {
              name: 'Rebel10',
              date: '2022-06-30',
              avatar:
                'https://firebasestorage.googleapis.com/v0/b/splitwise3-e6c96.appspot.com/o/st%2Csmall%2C507x507-pad%2C600x600%2Cf8f8f8.jpg?alt=media&token=0a008fd2-283b-4c13-aa0c-3f08ab869a45'
            })
          }
        >
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
      <SortButton />
    </>
  );

  const renderBasedOnPathname = () => {
    if (pathname === '/search') {
      return <>{renderSearch()}</>;
    }
    if (pathname.match('/expense/w*')) {
      return <>{renderExpense()}</>;
    }
    return <>{renderHome()}</>;
  };

  return <div className={classes.container}>{renderBasedOnPathname()}</div>;
};

export default UtilBar;
