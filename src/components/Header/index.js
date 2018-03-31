import React from 'react';
import { Link } from 'react-router-dom';
import './styles.less';

export default class Header extends React.Component {

    static path = '/';

    render() {
        return (
            <nav>
                <ul>
                    <li><Link to='/'>Список ТС</Link></li>
                    <li><Link to='/details'>Подробности</Link></li>
                    <li><Link to='/help'>Справка</Link></li>
                </ul>
            </nav>
        );
    }

}
