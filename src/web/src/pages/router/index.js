import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

// workspace imports

import { AppContext } from '../../providers';
import Home from '../home';
// import Search from '../search/Search';
import { Expense, LogIn, NavBar, UtilBar } from '../../features';

const Router = () => {
  const { loggedInUser } = useContext(AppContext);
  const { popUpForm } = useContext(AppContext);

  const useStyles = makeStyles({
    routerContainer: {
      pointerEvents: popUpForm ? 'none' : 'auto',
      filter: popUpForm ? 'blur(2px)' : 'none'
    }
  });

  const classes = useStyles(popUpForm);
  return (
    <BrowserRouter>
      <>
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
          <Route exact path="/">
            {loggedInUser ? <Home /> : <Redirect to="/login" />}
          </Route>

          {/* <Route exact path="/search">
            {loggedInUser ? <Search /> : <Redirect to="/login" />}
          </Route> */}
        </div>
      </>
    </BrowserRouter>
  );
};

export default Router;
