import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Search from '../../pages/search/Search';
import Expense from '../expenses/Expense';
import NavBar from '../navBar/NavBar';
import Testing from '../testing/Testing';
import UtilBar from '../utilBar/UtilBar';

const Router = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <UtilBar />
      <Route exact path="/expense/:id">
        <Expense />
      </Route>
      <Route exact path="/search">
        <Search />
      </Route>
      <Route exact path="/testing">
        <Testing />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </BrowserRouter>
  );
};

export default Router;
