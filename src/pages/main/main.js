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
            selectedId: Header.selectedItem ? String(Header.selectedItem) : '1',
            nextId: 4
        };
    }



    handleOnClick = (e) => {
        const elt = e.target.parentElement;
        const tableBody = elt.parentElement;

        tableBody.childNodes.forEach(_ => _.classList.remove('selected'));
        elt.classList.add('selected');

        this.setState({ selectedId: String(elt.firstChild.textContent) });
    };


    // ЗАПИСЬ НЕ ДОБАВЛЯЕТСЯ В db_temp, this.state.nextId - не записывается
    onClickBtnAddRecord() {

        let newRecord = {
            id: this.state.nextId,
            regNum: '00000000',
            cczIn: new Date(),
            notification: new Date(),
            cis: new Date(),
            inspection: new Date(),
            custClearance: new Date(),
            cczOut: new Date(),
        };

        data.push(newRecord);

        let newNextId = this.state.nextId++;

        this.setState({ selectedId: String(newRecord.id) });
        this.setState({ nextId: newNextId });

        const tableBody = document.getElementsByClassName('tableBody')[0];
        tableBody.childNodes.forEach(_ => _.classList.remove('selected'));
        tableBody.childNodes.item(tableBody.childNodes.length - 1).classList.add('selected');

        console.log("newRecord.id: ", String(newRecord.id));
        console.log("selectedId: ", this.state.selectedId );
        console.log("newNextId: ", this.state.nextId );
        console.log("Add Record: ", tableBody.childNodes.length);
    }

    // ЗАПИСЬ НЕ УДАЛЯЕТСЯ ИЗ db_temp!!!!!!!!!!!!!!!!!!!!!!!!!!
    onClickBtnDeleteRecord() {
        console.log("Delete record");

        //data.find(_ => _.id === +this.props.match.params.number);
        let index = data.findIndex(_ => _.id === +this.state.selectedId);
        let deletedRec = data.splice(index, 1);

        console.log("record: ", deletedRec);
    }

    //разобраться с управлением клавишами-стрелками
    handleOnKeyDown = (e) => {

        const keyCode = e.keyCode;
        console.log("Key Code: ", keyCode);

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

    // componentWillMount и componentDidMount здесь позволяют восстановить положение рамки-выделения в таблице
    // после возвращения из Подробностей
    componentWillMount() {

        this.setState({ selectedId: Header.selectedItem ? String(Header.selectedItem) : '1' });

    }

    componentDidMount() {
        const items = document.getElementsByClassName('item');

        for (let i = 0; i < items.length; i++) {
            if (items[i].firstChild.textContent === this.state.selectedId) {
                items[i].classList.add('selected');
                return;
            }
        }

    }

    render() {

        //document.body.onkeydown = this.handleOnKeyDown;

        return (
            <div className='mainPage'>
                <Header sel={ this.state.selectedId } />
                <div>
                    <button onClick={ this.onClickBtnAddRecord.bind(this) }>Добавить запись</button>
                    <button onClick={ this.onClickBtnDeleteRecord.bind(this) }>Удалить запись</button>
                </div>
                <table className='mainTable'  >
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
                    <tbody
                        onClick={ this.handleOnClick }
                        className='tableBody'
                    >
                        { data.map(this.renderItems) }
                    </tbody>
                </table>
            </div>
        );
    }

}
