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
  const { setPopUpForm, logout, setShowExpenseSidebar } = useContext(AppContext);
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
        logout();
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
      {/* <UtilButton tooltipTitle="Search" onclickCallback={() => history.push('/search')}>
        <SearchRoundedIcon />
      </UtilButton> */}
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
        Join &nbsp;
        <svg
          width="35"
          height="23"
          viewBox="0 0 27 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14 15.0001V13.0001C14 13.0001 14 9.00005 7 9.00005C0 9.00005 0 13.0001 0 13.0001V15.0001H14ZM9.91016 1.55553C10.2947 2.1311 10.5 2.80779 10.5 3.50005C10.5 4.42828 10.1312 5.31853 9.47485 5.97491C8.81848 6.63128 7.92828 7.00005 7 7.00005C6.30774 7.00005 5.6311 6.79479 5.05548 6.41021C4.47992 6.02563 4.03131 5.479 3.76642 4.83941C3.50153 4.19988 3.43219 3.49615 3.56726 2.81725C3.70227 2.1383 4.03564 1.51464 4.52515 1.0252C5.01459 0.535697 5.63824 0.202323 6.3172 0.0673137C6.99609 -0.0677571 7.69983 0.00157879 8.33942 0.266471C8.97894 0.531364 9.52557 0.979972 9.91016 1.55553ZM15.4137 10.7715C15.0578 10.0805 14.5547 9.47582 13.94 9.00005C20 9.37005 20 13.0001 20 13.0001V15.0001H16V13.0001C15.9697 12.2233 15.7696 11.4626 15.4137 10.7715ZM11.07 0.590019C11.6385 0.202018 12.3117 -0.0037923 13 5.29139e-05C13.9283 5.29139e-05 14.8185 0.368766 15.4749 1.0252C16.1312 1.68157 16.5 2.57177 16.5 3.50005C16.5 4.42828 16.1312 5.31853 15.4749 5.97491C14.8185 6.63128 13.9283 7.00005 13 7.00005C12.3117 7.0039 11.6385 6.79809 11.07 6.41003C11.6774 5.56133 12.004 4.54375 12.004 3.50005C12.004 2.45635 11.6774 1.43877 11.07 0.590019ZM18.6667 6.49493H27V7.50506H18.6667L22.4861 10.2828L21.5 11L16 6.99999L21.5 2.99999L22.4861 3.71715L18.6667 6.49493Z"
            fill="black"
          />
        </svg>
      </UtilButton>

      {/* Add an expense button */}
      <UtilButton
        tooltipTitle="Add an expense"
        onclickCallback={() => setPopUpForm(popUpFormNames.ADD_EXPENSE)}
      >
        Add
        <svg
          width="35"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 13H13V17H11V13H7V11H11V7H13V11H17M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V2Z"
            fill="black"
          />
        </svg>
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
