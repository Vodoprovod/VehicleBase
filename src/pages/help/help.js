import React from 'react';
import { Header } from '../../components/Header/index';

export default class HelpPage extends React.Component {

    static path = '/help';

    render() {
        return (

            <div>
                <Header />
                <h1>Help page</h1>
            </div>

        );
    }

}
