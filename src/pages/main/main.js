import React from 'react';
import { Link } from 'react-router-dom';

import data from '../../database/db_temp';
import ListItem from './item';
import './styles.less';
import Header from '../../components/Header/index';

import Modal from '../../components/Modal/index';


export default class MainPage extends React.Component {

    static path = '/';

    state = {
        selectedId: Header.selectedItem ? String(Header.selectedItem) : '1',
        data: data,
        modalTitle: null,
        modalContent: null,
        modalFooter: null,
        modalAction: null
    };

    constructor(props) {
        super(props);
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

        //===========================ЗАГЛУШКА============================
        // let newRecord = {
        //     id: Math.random().toFixed(3) * 1000 ,
        //     regNum: 'AAA' + Math.random().toFixed(3) * 1000,
        //     cczIn: new Date(),
        //     notification: new Date(),
        //     cis: new Date(),
        //     inspection: new Date(),
        //     custClearance: new Date(),
        //     cczOut: new Date(),
        // };
        //
        // this.state.data.push(newRecord);
        //
        // this.setState({ selectedId: String(newRecord.id) });
        //============================КОНЕЦ ЗАГЛУШКИ===========================

        this.setState({
            modalTitle: 'Добавление записи',
            modalContent: 'Заполните поля',
            modalFooter: 'Сохранить',
            modalAction: 'NewRecord'
        });

        this.showModal();

    }

    // ЗАПИСЬ НЕ УДАЛЯЕТСЯ ИЗ db_temp!!!!!!!!!!!!!!!!!!!!!!!!!!
    onClickBtnDeleteRecord() {

        let index = this.state.data.findIndex(_ => _.id === +this.state.selectedId);

        this.setState({
            modalTitle: 'Удаление записи',
            modalContent: `Удалить запись о ТС № ${ this.state.data[index].regNum } ?`,
            modalFooter: 'Удалить',
            modalAction: 'Deleting'
        });

        this.showModal();
    }

    actionDeleteRecord() {
        let index = this.state.data.findIndex(_ => _.id === +this.state.selectedId);
        this.state.data.splice(index, 1);
        this.setState({ selectedId: '1' });
    }

    actionNewRecord( fetchedData ) {
        console.log('actionNewRecord получены данные: ', fetchedData);
    }

    getModalData = (fetchedModalData) => {
        //console.log('Данные, которые вернуло окно: ', fetchedModalData);

        if (this.state.modalAction === 'Deleting' && fetchedModalData === true) {
            console.log('Удаление подтверждено');
            this.actionDeleteRecord();
        } else if (this.state.modalAction === 'NewRecord') {
            console.log('Добавление подтверждено');
            this.actionNewRecord(fetchedModalData);
        } else {
            console.log('Действие отменено');
        }

        this.setState({
            modalTitle: null,
            modalContent: null,
            modalFooter: null,
            modalAction: null
        });
    };

    showModal() {
        let elt = document.getElementsByClassName('modal');
        elt[0].classList.add('visible');
        let panels = document.getElementsByClassName('panel');
        panels[0].classList.add('visible');
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
        //console.log('componentDidMount');
    }

    // componentDidUpdate здесь используется для позиционирования рамки-выделения в таблице
    // после добавления записи
    componentDidUpdate() {
        this.selectRecord();
        //console.log('componentDidUpdate');
    }

    render() {

        //document.body.onkeydown = this.handleOnKeyDown;
        return (
            <div className='mainPage'>
                <div className='panel'></div>
                <Modal
                    modalTitle={ this.state.modalTitle }
                    modalContent={ this.state.modalContent }
                    modalFooter={ this.state.modalFooter }
                    onConfirm={ this.getModalData }
                    modalAction={ this.state.modalAction }
                />
                <Header sel={ this.state.selectedId } />
                <div>
                    <button onClick={ this.onClickBtnAddRecord.bind(this) }>Добавить запись</button>
                    <button onClick={ this.onClickBtnDeleteRecord.bind(this) }>Удалить запись</button>
                    <button onClick={ this.showModal.bind(this) }>Показать окно</button>
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

// {/*<Modal*/}
//     {/*modalTitle={ this.state.modalTitle }*/}
//     {/*modalContent={ this.state.modalContent }*/}
//     {/*modalFooter={ this.state.modalFooter }*/}
//     {/*onConfirm={ this.getModalData }*/}
// {/*/>*/}
