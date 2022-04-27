import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Search from '../../pages/search/Search';
import UtilBar from '../utilBar/UtilBar';

const Router = () => {
  return (
    <BrowserRouter>
      <UtilBar />
      <Route exact path="/search">
        <Search />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </BrowserRouter>
  );
};

export default Router;
