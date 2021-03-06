//import MainPage from '../../pages/main/main';
// import data from '../../database/db_temp';
//export default class DetailsItemPage extends React.Component {

import React from 'react';
import moment from 'moment';

import { Header } from '../../components/Header/index';
import { fetchItemAction } from './actions';

class DetailsItemPage extends React.Component {

    // constructor(props) {
    //     super(props);
    //
    //     const itemDB = this.getCurrentItemFromDB();
    //
    //     this.state = {
    //         id: itemDB.id,
    //         regNum: itemDB.regNum,
    //         cczIn: this.formatDate(itemDB.cczIn),
    //         notification: this.formatDate(itemDB.notification),
    //         cis: this.formatDate(itemDB.cis),
    //         inspection: this.formatDate(itemDB.inspection),
    //         custClearance: this.formatDate(itemDB.custClearance),
    //         cczOut: this.formatDate(itemDB.cczOut)
    //     };
    //
    // }

    getCurrentItemFromDB() {

        // для работы с временной БД
        //return data.find(_ => _.id === +this.props.match.params.number);

        //return MainPage.currentData.find(_ => _.id === +this.props.match.params.number);

        //return MainPage.currentData.find(_ => _.id === +this.props.selectedItemId);
        return this.props.currentData.find(_ => _.id === +this.props.selectedItemId);

    }

    formatDate(customDate) {
        //return moment(customDate).format('DD.MM.YYYY HH:mm:ss');
        // if ((typeof customDate) === 'string')
        //     return "---";
        // else
        //     return moment(customDate).format('DD.MM.YYYY HH:mm:ss');

        if ((typeof customDate) === 'object' || (typeof new Date(customDate)) === 'object')
            return moment(customDate).format('DD.MM.YYYY HH:mm:ss');
        else
            return "---";
    }

    render() {

        this.props.fetchItemFromDB(this.getCurrentItemFromDB());

        let item = this.props.item;

        return (
            <div>
                <Header />
                <div className="topBlockDetails">
                    <div className="headerDetails"><h2>{ item.regNum }</h2></div>
                    <table className="tableDetails">
                        <tbody>
                        <tr><td className="detailName">Въезд в ЗТК</td><td className="detail">{ this.formatDate(item.cczIn) }</td></tr>
                        <tr><td className="detailName">Сообщение</td><td className="detail">{ this.formatDate(item.notification) }</td></tr>
                        <tr><td className="detailName">ИДК</td><td className="detail">{ this.formatDate(item.cis) }</td></tr>
                        <tr><td className="detailName">Досмотр</td><td className="detail">{ this.formatDate(item.inspection) }</td></tr>
                        <tr><td className="detailName">Оформление</td><td className="detail">{ this.formatDate(item.custClearance) }</td></tr>
                        <tr><td className="detailName">Выезд из ЗТК</td><td className="detail">{ this.formatDate(item.cczOut) }</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }

}

//<Header sel={ this.state.id } />

import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        selectedItemId: state.selectedItemId,
        currentData: state.pushTableData,
        item: state.fetchDetailsItem
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchItemFromDB: (item) => dispatch(fetchItemAction(item))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsItemPage);

// return (
//     <div>
//         <Header />
//         <div className="topBlockDetails">
//             <div className="headerDetails"><h2>{ this.state.regNum }</h2></div>
//             <table className="tableDetails">
//                 <tbody>
//                 <tr><td className="detailName">Въезд в ЗТК</td><td className="detail">{ this.state.cczIn }</td></tr>
//                 <tr><td className="detailName">Сообщение</td><td className="detail">{ this.state.notification }</td></tr>
//                 <tr><td className="detailName">ИДК</td><td className="detail">{ this.state.cis }</td></tr>
//                 <tr><td className="detailName">Досмотр</td><td className="detail">{ this.state.inspection }</td></tr>
//                 <tr><td className="detailName">Оформление</td><td className="detail">{ this.state.custClearance }</td></tr>
//                 <tr><td className="detailName">Выезд из ЗТК</td><td className="detail">{ this.state.cczOut }</td></tr>
//                 </tbody>
//             </table>
//         </div>
//     </div>
//
// );