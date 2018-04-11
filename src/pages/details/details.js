import React from 'react';
import { Route, Switch } from 'react-router-dom';

import DetailsEmptyPage from './details_empty';
import DetailsItemPage from './details_item';

export default class DetailsPage extends React.Component {

    render() {
        return (
            <Switch>
                    <Route exact path='/details' component={ DetailsEmptyPage } />
                    <Route path='/details/:number' component={ DetailsItemPage } />
            </Switch>

        );
    }

}

