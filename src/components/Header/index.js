import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './styles.less';
import { MainPage } from '../../pages/main/index.js';


export default class Header extends React.Component {

    static path = '/';

    static selectedItem = 0;

    render() {

        Header.selectedItem = MainPage.selectedItem;
        console.log("Header selectedItem in render: ", Header.selectedItem);

        let str = '/details/' + (Header.selectedItem === 0 ? "" : Header.selectedItem) ;

        console.log("str: ", String(str));

        return (

            <nav >
                <ul >
                    <li><Link to='/'>Список ТС</Link></li>
                    <li><Link to={ str } >Подробности</Link></li>
                    <li><Link to='/help'>Справка</Link></li>
                </ul>
            </nav>
        );
    }

}

//<li><Link to={ this.selectedItem ? `/details/${ this.selectedItem }` : '/details'}>Подробности</Link></li>

//<li><Link to={ str }>Подробности</Link></li>

//<li><Link to='/details'>Подробности</Link></li>

//<Redirect push to={ `/details/${ this.props.id }` } />
//<Redirect push to={ `/details/1` } />