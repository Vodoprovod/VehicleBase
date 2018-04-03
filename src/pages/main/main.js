import React from 'react';
import { Link } from 'react-router-dom';

import data from '../../database/db_temp';
import ListItem from './item';
import './styles.less';

export default class MainPage extends React.Component {

    static path = '/';

    static selectedItem = null;

    constructor(props) {
        super(props);

        this.state = {
          selectedId:""
        };
    }



    handleOnClick = (e) => {
        const elt = e.target.parentElement;
        const tableBody = elt.parentElement;

        console.log("eltFchld: ", elt.firstChild.textContent );

        tableBody.childNodes.forEach(_ => _.classList.remove('selected'));
        elt.classList.add('selected');

        MainPage.selectedItem = elt.firstChild.textContent;

        console.log("selectedItem: ", MainPage.selectedItem);
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

    render() {
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
