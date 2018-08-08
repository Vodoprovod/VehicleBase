import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './styles.less';


export default class Header extends React.Component {

    static path = '/';

    //static selectedItem = 0;

    render() {

        //Header.selectedItem = this.props.sel;
        let str = '/details/' + this.props.sel ;

        return (
            <nav >
                <ul>
                    <li><Link to='/'>Список ТС</Link></li>
                    <li><Link to={ str } >Подробности</Link></li>
                    <li><Link to='/help'>Справка</Link></li>
                    <li><Link to='/temporary'>Тест</Link></li>
                </ul>
            </nav>
        );
    }

}

