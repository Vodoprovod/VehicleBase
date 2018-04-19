import React, { Component, PropTypes } from 'react';

import Modal from './components/Modal/index';

import { MainRoutes } from './pages/main/index';
import { DetailsRoutes } from './pages/details/index';
import { HelpRoutes } from './pages/help/index';

export default class App extends Component {


    render () {

        return (
            <div className='appWindow'>
                { MainRoutes }
                { DetailsRoutes }
                { HelpRoutes }
            </div>
        );
    }
};

