import React from 'react';
import { Link } from 'react-router-dom';

import data from '../../database/db_temp';
import ListItem from './item';
import './styles.less';
import Header from '../../components/Header/index';

export default class MainPage extends React.Component {

    static path = '/';

    constructor(props) {
        super(props);

        this.state = {
          selectedId: Header.selectedItem ? String(Header.selectedItem) : '1'
        };
    }



    handleOnClick = (e) => {
        const elt = e.target.parentElement;
        const tableBody = elt.parentElement;

        tableBody.childNodes.forEach(_ => _.classList.remove('selected'));
        elt.classList.add('selected');

        this.setState({ selectedId: String(elt.firstChild.textContent) });
    };

    renderItems(item, idx) {
        return (
            <ListItem
                key={ idx }
                id={ item.id }
                regNum={ item.regNum }
                cczIn={ item.cczIn }
                notification={ item.notification }
                cis={ item.cis }
                inspection={ item.inspection }
                custClearance={ item.custClearance }
                cczOut={ item.cczOut }
            />
        );
    }


    //////////////////////////////НЕ ВЫДЕЛЯЕТ СТРОКУ!!!!!!!!!!!!
    componentWillMount() {

        this.setState({ selectedId: Header.selectedItem ? String(Header.selectedItem) : '1' });

        console.log("item: ", this.state.selectedId);

        let items = document.getElementsByClassName('item');

        console.log("ITEMS: ", items );

        const arr = [...items];
        //[].push.apply(arr, items);

        console.log("ITEMS_LENGTH: ", arr.length );

        for (let i = 0; i < items.length; i++) {

            console.log("id: ", this.state.selectedId);
            //console.log("id: ", items[i].firstChild.textContent);

            // if (items[i].firstChild.textContent === this.state.selectedId) {
            //     items[i].classList.add('selected');
            //     console.log("selected item", items[i]);
            //     return;
            // }
        }


    }

    render() {

        return (
            <div className='mainPage'>
                <Header sel={ this.state.selectedId } />
                <table className='mainTable'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Рег. номер</th>
                            <th>Въезд в ЗТК</th>
                            <th>Сообщение</th>
                            <th>ИДК</th>
                            <th>Досмотр</th>
                            <th>Оформление</th>
                            <th>Выезд из ЗТК</th>
                        </tr>
                    </thead>
                    <tbody onClick={ this.handleOnClick }>
                        { data.map(this.renderItems) }
                    </tbody>
                </table>
            </div>
        );
    }

}
