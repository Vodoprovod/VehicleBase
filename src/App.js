import React, { Component, PropTypes } from 'react';

import Header from './components/Header/index';

import { MainRoutes } from './pages/main/index';
import { DetailsRoutes } from './pages/details/index';
import { HelpRoutes } from './pages/help/index';

export default class App extends Component {


    render () {

        return (
            <div>
                { MainRoutes }
                { DetailsRoutes }
                { HelpRoutes }
            </div>
        );
    }
};

