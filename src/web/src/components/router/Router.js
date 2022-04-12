import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from '../../pages/home/Home';

const Router = () => {
  return (
    <BrowserRouter>
      <Route path="/">
        <Home />
      </Route>
    </BrowserRouter>
  );
};

export default Router;
