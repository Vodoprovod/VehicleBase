import React from 'react';
import { Link } from 'react-router-dom';

import data from '../../database/db_temp';
import ListItem from './item';
import './styles.less';
import Header from '../../components/Header/index';

export default class MainPage extends React.Component {

    static path = '/';

    static selectedItem = 0;

    constructor(props) {
        super(props);

        this.state = {
          selectedId:""
        };
    }



    handleOnClick = (e) => {
        const elt = e.target.parentElement;
        const tableBody = elt.parentElement;

        tableBody.childNodes.forEach(_ => _.classList.remove('selected'));
        elt.classList.add('selected');

        MainPage.selectedItem = elt.firstChild.textContent;

        //Header.recallUpdate();

        console.log("selectedItem: ", MainPage.selectedItem);
    }

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
    componentDidMount() {
        // document.getElementsByClassName('item').forEach(_ => {
        //     if (_.firstChild.textContent === MainPage.selectedItem) _.classList.add('selected');
        // })

        console.log("items: ", document.getElementsByClassName('item'));

        let items = document.getElementsByClassName('item');

        //items.forEach(item => { if (item.firstChild.textContent === MainPage.selectedItem) item.classList.add('selected') });

        for (let i = 0; i < items.length; i++) {
            if (items[i].firstChild.textContent === MainPage.selectedItem) {
                items[i].classList.add('selected');
                console.log("selected item", items[i]);
                return;
            }
        }
    }

    render() {

        MainPage.selectedItem = 0;


        return (
            <div className='mainPage'>
                <h1>Список ТС</h1>

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
