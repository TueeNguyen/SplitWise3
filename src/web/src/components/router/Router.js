import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { SWContext } from '../../contexts/SWContext';
import Home from '../../pages/home/Home';
import Search from '../../pages/search/Search';
import Expense from '../expenses/expense/Expense';
import LogIn from '../logIn/LogIn';
import NavBar from '../navBar/NavBar';
import JoinExpense from '../popUpForms/JoinExpense';
import Testing from '../testing/Testing';
import UtilBar from '../utilBar/UtilBar';

const Router = () => {
  const { loggedInUser } = useContext(SWContext);
  const { appBlurring, joinExpenseForm } = useContext(SWContext);

  const useStyles = makeStyles({
    routerContainer: {
      pointerEvents: appBlurring ? 'none' : 'auto',
      filter: appBlurring ? 'blur(2px)' : 'none'
    }
  });

  const classes = useStyles(appBlurring);
  return (
    <BrowserRouter>
      <>
        {joinExpenseForm ? <JoinExpense /> : null}
        <div className={classes.routerContainer}>
          {loggedInUser ? (
            <>
              <NavBar />
              <UtilBar />
            </>
          ) : null}
          <Route exact path="/login">
            {loggedInUser ? <Redirect to="/" /> : <LogIn />}
          </Route>
          <Route exact path="/expense/:id">
            {loggedInUser ? <Expense /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/search">
            {loggedInUser ? <Search /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/testing">
            {loggedInUser ? <Testing /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/">
            {loggedInUser ? <Home /> : <Redirect to="/login" />}
          </Route>
        </div>
      </>
    </BrowserRouter>
  );
};

export default Router;
