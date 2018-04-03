import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './styles.less';
import { MainPage } from '../../pages/main/index.js';


export default class Header extends React.Component {

    static path = '/';

    render() {

        let selectedItem = Number(MainPage.selectedItem);

        let str = '/details/' + selectedItem;

        console.log("selected in header: ", str);

        return (

            <nav>
                <ul>
                    <li><Link to='/'>Список ТС</Link></li>
                    <li><Link to={ '/details/' + selectedItem }>Подробности</Link></li>
                    <li><Link to='/help'>Справка</Link></li>
                </ul>
            </nav>
        );
    }

}

//<li><Link to={ this.selectedItem ? `/details/${ this.selectedItem }` : '/details'}>Подробности</Link></li>

//<li><Link to='/details'>Подробности</Link></li>

//<Redirect push to={ `/details/${ this.props.id }` } />
//<Redirect push to={ `/details/1` } />