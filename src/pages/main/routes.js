import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './mainContainer';

export default (
    <Route component={ MainPage } exact path={ MainPage.path }  />
);