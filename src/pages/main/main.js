import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

//import data from '../../database/db_temp';
import ListItem from './item';
import './styles.less';
import { Header } from '../../components/Header/index';

import Modal from '../../components/Modal/index';


class MainPage extends React.Component {

    static path = '/';

    static currentData = [];

    //static selectedItemId = 0;

    // state = {
    //     selectedId: Header.selectedItem ? String(Header.selectedItem) : String(MainPage.selectedItemId),
    //     data: [],
    //     modalTitle: null,
    //     modalContent: null,
    //     modalFooter: null,
    //     modalAction: null
    // };

    state = {
        data: [],
        modalTitle: null,
        modalContent: null,
        modalFooter: null,
        modalAction: null
    };

    //////////////////////////////Redux complete///////////////////////////////////////////////////////////////////////
    handleOnClick = (e) => {
        const elt = e.target.parentElement;
        const tableBody = elt.parentElement;

        tableBody.childNodes.forEach(_ => _.classList.remove('selected'));
        elt.classList.add('selected');

        //this.setState({ selectedId: elt.firstChild.textContent });
        //MainPage.selectedItemId = +elt.firstChild.textContent;

        this.props.onSelectRecord(elt.firstChild.textContent);

    };

    getIndex() {
        //return this.state.data.findIndex(_ => _.id === +this.state.selectedId);
        return this.state.data.findIndex(_ => _.id === +this.props.selectedItemId );
    }

    onClickBtnAddRecord() {

        this.setState({
            modalTitle: 'Добавление записи',
            modalContent: 'Заполните поля',
            modalFooter: 'Сохранить',
            modalAction: 'newRecord'
        });

        this.showModal();

    }

    onClickBtnEditRecord() {

        let index = this.getIndex();

        this.setState({
            modalTitle: 'Редактирование записи',
            modalContent: `Редактирование записи о ТС № ${ this.state.data[index].regNum }`,
            modalFooter: 'Сохранить',
            modalAction: 'editRecord'
        });

        this.showModal();
    }

    onClickBtnDeleteRecord() {

        let index = this.getIndex();

        this.setState({
            modalTitle: 'Удаление записи',
            modalContent: `Удалить запись о ТС № ${ this.state.data[index].regNum } ?`,
            modalFooter: 'Удалить',
            modalAction: 'deleting'
        });

        this.showModal();
    }

    actionDeleteRecord() {

        let index = this.getIndex();

        //if ( this.deleteRecord(this.state.selectedId) ) {
        if ( this.deleteRecord(this.props.selectedItemId) ) {
            this.state.data.splice(index, 1);
            //this.setState({ selectedId: '1' });
            this.props.onSelectRecord(1);
        } else {
            alert('Ошибка в процессе удаления записи');
        }
    }

    actionNewRecord( fetchedData ) {

        let newRecord = {
        id: Math.random().toFixed(5) * 100000 ,
            regNum: fetchedData.regNum,
            cczIn: fetchedData.inputСczIn,
            notification: "---",
            cis: "---",
            inspection: "---",
            custClearance: "---",
            cczOut: "---",
        };

        if ( this.addRecord(newRecord) ) {
            this.state.data.push(newRecord);
            //this.setState({ selectedId: String(newRecord.id) });
            this.props.onSelectRecord(String(newRecord.id));
        } else {
            alert('Ошибка в процессе добавления записи');
        }
    }

    actionEditRecord( fetchedData ) {

        let index = this.getIndex();

        //if (this.editRecord( this.state.selectedId, fetchedData )){
        if (this.editRecord( this.props.selectedItemId, fetchedData )){
            let record = this.state.data[index];
            this.state.data[index] = { ...record, ...fetchedData};
        } else {
            alert('Ошибка в процессе редактирования записи');
        }
    }

    getModalData = (fetchedModalData) => {
        if (this.state.modalAction === 'deleting' && fetchedModalData === true) {
            this.actionDeleteRecord();
        } else if (this.state.modalAction === 'newRecord' && fetchedModalData !== false) {
            this.actionNewRecord(fetchedModalData);
        } else if (this.state.modalAction === 'editRecord' && fetchedModalData !== false) {
            this.actionEditRecord(fetchedModalData);
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

    async showData() {
        try {

            const response = await fetch('http://localhost:3000/api/vehiclelist');
            const data = await response.json();

            // if (MainPage.selectedItemId === 0)
            //     MainPage.selectedItemId = await +data[0].id;

            //======================================возможна лажа - await отсутствует====================
            if (this.props.selectedItemId === 0)
                this.props.onSelectRecord(+data[0].id);

            this.setState({ data });

            MainPage.currentData = data;

        } catch (err) {
            console.log(err)
        }
    }

    async addRecord( newRecord ) {

        const request = new Request('http://localhost:3000/api/addvehicle', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(newRecord)
        });

        try {
            const response = await fetch(request);
            const data = await response.json();
            return true;
        } catch (err) {
            console.log('addRecord response error: ', err);
            return false;
        }
    }

    async deleteRecord(id) {
        const request = new Request('http://localhost:3000/api/deletevehicle/' + id, {
            method: 'DELETE'
        });

        try {
            const response = await fetch(request);
            return true;
        } catch (err) {
            console.log('deleteRecord response error: ', err);
            return false;
        }
    }

    async editRecord( id, changedData ) {
        const request = new Request('http://localhost:3000/api/editvehicle/' + id, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(changedData)
        });

        try {
            const response = await fetch(request);
            const data = await response.json();
            return true;
        } catch (err) {
            console.log('editRecord response error: ', err);
            return false;
        }
    }

    //разобраться с управлением клавишами-стрелками
    // handleOnKeyDown = (e) => {
    //
    //     const keyCode = e.keyCode;
    //     console.log("Key Code: ", keyCode);
    //
    // };

    //////////////////////////////Redux complete///////////////////////////////////////////////////////////////////////
    static formatDate(customDate) {
        // заморочки с определениями типов связаны с тем, что данные сейчас могут приходить как в формате даты (из временной БД),
        // так и в формате строки (из postgresql)
        if ((typeof customDate) === 'object' || (typeof new Date(customDate)) === 'object')
            return moment(customDate).format('DD.MM.YYYY HH:mm:ss');
        else
            return "---";
    }

    //////////////////////////////Redux complete///////////////////////////////////////////////////////////////////////
    renderItems(item, idx) {

        let _cczIn = String(MainPage.formatDate(item.cczIn));
        let _notification = String(MainPage.formatDate(item.notification));
        let _cis = String(MainPage.formatDate(item.cis));
        let _inspection = String(MainPage.formatDate(item.inspection));
        let _custClearance = String(MainPage.formatDate(item.custClearance));
        let _cczOut = String(MainPage.formatDate(item.cczOut));

        return (
            <ListItem
                key={ idx }
                id={ item.id }
                regNum={ item.regNum }
                cczIn={ _cczIn }
                notification={ _notification }
                cis={ _cis }
                inspection={ _inspection }
                custClearance={ _custClearance }
                cczOut={ _cczOut }
            />
        );
    }


    //////////////////////////////Redux complete///////////////////////////////////////////////////////////////////////
    // функция используется для позиционирования рамки-выделения в таблице
    selectRecord() {

        //переделать на getElementById
        let items = document.getElementsByClassName('item');

        let arr = [];
        arr.push.apply(arr, items);
        arr.forEach(_ => _.classList.remove('selected'));
        arr.forEach(_ => {
            //if (_.firstChild.textContent === this.state.selectedId) _.classList.add('selected');
            if (_.firstChild.textContent === this.props.selectedItemId) _.classList.add('selected');
        });

    }

    //////////////////////////////Redux complete///////////////////////////////////////////////////////////////////////
    // componentWillMount и componentDidMount здесь позволяют восстановить положение рамки-выделения в таблице
    // после возвращения из Подробностей
    componentWillMount() {

        //this.setState({ selectedId: Header.selectedItem ? String(Header.selectedItem) : String(MainPage.selectedItemId) });

        //предположительно никаких дополнительных операций здесь делать не надо

        this.selectRecord();
    }

    componentDidMount() {
        //this.setState({ data });    //для работы с временной БД
        this.showData();
    }

    //////////////////////////////Redux complete///////////////////////////////////////////////////////////////////////
    // componentDidUpdate здесь используется для позиционирования рамки-выделения в таблице
    // после добавления записи
    componentDidUpdate() {
        //console.log('componentDidUpdate => selectRecordAction', this.state.selectedId);
        this.selectRecord();
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
                <Header />
                <div>
                    <button onClick={ this.onClickBtnAddRecord.bind(this) }>Добавить запись</button>
                    <button onClick={ this.onClickBtnEditRecord.bind(this) }>Редактировать запись</button>
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
                    { this.state.data.map(this.renderItems) }
                    </tbody>
                </table>
            </div>
        );
    }

};

export default MainPage;

//<Header sel={ /* this.state.selectedId */ this.props.selectedItemId } />

// import { selectRecordAction } from './actions';
//
// import { connect } from 'react-redux';
//
// const mapStateToProps = (state) => {
//
//     return {
//         selectedItemId: state.selectedItemId
//     };
// };
//
// const mapDispatchToProps = (dispatch) => {
//
//     return {
//         onSelectRecord: (id) => dispatch(selectRecordAction(id))
//     };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(MainPage);


//===========================ЗАГЛУШКА для onClickBtnAddRecord============================
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



