import React, { useContext } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { SWContext } from '../../contexts/SWContext';
import Home from '../../pages/home/Home';
import Search from '../../pages/search/Search';
import Expense from '../expenses/expense/Expense';
import LogIn from '../logIn/LogIn';
import NavBar from '../navBar/NavBar';
import Testing from '../testing/Testing';
import UtilBar from '../utilBar/UtilBar';

const Router = () => {
  const { loggedInUser } = useContext(SWContext);
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default Router;
