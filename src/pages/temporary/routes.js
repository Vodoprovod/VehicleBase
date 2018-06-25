import React from 'react';
import { Route } from 'react-router-dom';
import TemporaryPage from './temporary';

export default (
    <Route component={ TemporaryPage } exact path={ TemporaryPage.path }  />
);