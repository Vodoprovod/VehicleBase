import React from 'react';
import { Route } from 'react-router-dom';
import DetailsPage from './details';

export default (
    <Route component={ DetailsPage } path = '/details' />
);

// export default (
//     <Route component={ DetailsPage } path={ DetailsPage.path } />
// );