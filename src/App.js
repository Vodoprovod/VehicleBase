import React, { Component, PropTypes } from 'react';

import { MainRoutes } from './pages/main/index';
import { DetailsRoutes } from './pages/details/index';
import { HelpRoutes } from './pages/help/index';
import { TemporaryRoutes } from './pages/temporary/index';

const App = () => (
            <div className='appWindow'>
                { MainRoutes }
                { DetailsRoutes }
                { HelpRoutes }
                { TemporaryRoutes }
            </div>
        );

export default App;

