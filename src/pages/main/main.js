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
            data: data
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
            id: Math.random().toFixed(3) * 1000 ,
            regNum: 'AAA' + Math.random().toFixed(3) * 1000,
            cczIn: new Date(),
            notification: new Date(),
            cis: new Date(),
            inspection: new Date(),
            custClearance: new Date(),
            cczOut: new Date(),
        };

        this.state.data.push(newRecord);

        this.setState({ selectedId: String(newRecord.id) });

        // console.log("newRecord.id: ", String(newRecord.id));
        // console.log("selectedId: ", this.state.selectedId );
    }

    // ЗАПИСЬ НЕ УДАЛЯЕТСЯ ИЗ db_temp!!!!!!!!!!!!!!!!!!!!!!!!!!
    onClickBtnDeleteRecord() {

        let index = this.state.data.findIndex(_ => _.id === +this.state.selectedId);

        if (confirm("Удалить запись о ТС № " + this.state.data[index].regNum + "?")) {
            this.state.data.splice(index, 1);
            this.setState({selectedId: '1'});
        } else {
            return;
        }

    }

    onClickBtnShowModal() {
        let elt = document.getElementsByClassName('modal');
        elt[0].classList.add('visible');
        let panels = document.getElementsByClassName('panel');
        panels[0].classList.add('visible');

        console.log(elt);
        console.log(panels);
    }

    //разобраться с управлением клавишами-стрелками
    // handleOnKeyDown = (e) => {
    //
    //     const keyCode = e.keyCode;
    //     console.log("Key Code: ", keyCode);
    //
    // };

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

    // функция используется для позиционирования рамки-выделения в таблице
    selectRecord() {

        let items = document.getElementsByClassName('item');

        let arr = [];
        arr.push.apply(arr, items);
        arr.forEach(_ => _.classList.remove('selected'));
        arr.forEach(_ => {
            if (_.firstChild.textContent === this.state.selectedId) _.classList.add('selected');
            return;
        });
    }


    // componentWillMount и componentDidMount здесь позволяют восстановить положение рамки-выделения в таблице
    // после возвращения из Подробностей
    componentWillMount() {
        this.setState({ selectedId: Header.selectedItem ? String(Header.selectedItem) : '1' });
    }

    componentDidMount() {
        this.setState({ data });
        this.selectRecord();
    }

    // componentDidUpdate здесь используется для позиционирования рамки-выделения в таблице
    // после добавления записи
    componentDidUpdate() {
        this.selectRecord();
    }

    render() {

        //document.body.onkeydown = this.handleOnKeyDown;

        //console.log("RENDERED");

        return (
            <div className='mainPage'>
                <div className='panel' ></div>
                <Header sel={ this.state.selectedId } />
                <div>
                    <button onClick={ this.onClickBtnAddRecord.bind(this) }>Добавить запись</button>
                    <button onClick={ this.onClickBtnDeleteRecord.bind(this) }>Удалить запись</button>
                    <button onClick={ this.onClickBtnShowModal.bind(this) }>Показать окно</button>
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
                    { this.state.data.map(this.renderItems) }
                    </tbody>
                </table>
            </div>
        );
    }

}


//{ data.map(this.renderItems) }