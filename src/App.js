import React, { Component, PropTypes } from 'react';

import { MainRoutes } from './pages/main/index';
import { DetailsRoutes } from './pages/details/index';
import { HelpRoutes } from './pages/help/index';
import { TemporaryRoutes } from './pages/temporary/index';

// export default class App extends Component {
//
//
//     render () {
//
//         return (
//             <div className='appWindow'>
//                 { MainRoutes }
//                 { DetailsRoutes }
//                 { HelpRoutes }
//                 { TemporaryRoutes }
//             </div>
//         );
//     }
// };
//
// export default class App extends Component {
// };

const App = () => (
            <div className='appWindow'>
                { MainRoutes }
                { DetailsRoutes }
                { HelpRoutes }
                { TemporaryRoutes }
            </div>
        );

export default App;

