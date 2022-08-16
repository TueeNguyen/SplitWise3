import React, { useContext } from 'react';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { IconButton, SvgIcon, Tooltip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { makeStyles } from '@mui/styles';
import { useHistory, useLocation } from 'react-router-dom';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import SettingsIcon from '@mui/icons-material/Settings';

// workspace imports

import { AppContext } from '../../providers';
import axiosInstance from '../../configs/axios';
import { popUpFormNames } from '../../constants';
import { UtilButton } from './components';
// import SearchBar from './searchBar/SearchBar';
// import SortButton from './sortButton/SortButton';

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
  const { setPopUpForm, toLogIn, setShowExpenseSidebar } = useContext(AppContext);
  const createExpense = async () => {
    try {
      await axiosInstance.post('/expense/create', {
        name: 'Rebel10',
        date: '2022-06-30',
        avatar:
          'https://firebasestorage.googleapis.com/v0/b/splitwise3-e6c96.appspot.com/o/st%2Csmall%2C507x507-pad%2C600x600%2Cf8f8f8.jpg?alt=media&token=0a008fd2-283b-4c13-aa0c-3f08ab869a45'
      });
    } catch (err) {
      if (err.response.status === 401) {
        toLogIn();
      }
      console.error(err);
    }
  };
  const renderSearch = () => null;
  const renderExpense = () => (
    <>
      {/* Exepnse side bar button */}
      <UtilButton
        tooltipTitle="Show expense setting"
        onclickCallback={() => {
          setShowExpenseSidebar(true);
        }}
      >
        <SettingsIcon />
      </UtilButton>

      {/* Search button */}
      <UtilButton tooltipTitle="Search" onclickCallback={() => history.push('/search')}>
        <SearchRoundedIcon />
      </UtilButton>
    </>
  );
  const renderHome = () => (
    <>
      {/* Join an expense button */}
      <UtilButton
        tooltipTitle="Join an expense"
        onclickCallback={() => {
          setPopUpForm(popUpFormNames.JOIN_EXPENSE);
        }}
      >
        <DoubleArrowIcon />
      </UtilButton>

      {/* Add an expense button */}
      <UtilButton tooltipTitle="Add an expense" onclickCallback={createExpense}>
        <AddCircleIcon />
      </UtilButton>

      {/* <SortButton /> */}
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

export { UtilBar };
