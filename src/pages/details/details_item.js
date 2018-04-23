import React from 'react';
import data from '../../database/db_temp';
import moment from 'moment';

import Header from '../../components/Header/index';

export default class DetailsItemPage extends React.Component {

    constructor(props) {
        super(props);

        const itemDB = this.getCurrentItemFromDB();

        this.state = {
            id: itemDB.id,
            regNum: itemDB.regNum,
            cczIn: this.formatDate(itemDB.cczIn),
            notification: this.formatDate(itemDB.notification),
            cis: this.formatDate(itemDB.cis),
            inspection: this.formatDate(itemDB.inspection),
            custClearance: this.formatDate(itemDB.custClearance),
            cczOut: this.formatDate(itemDB.cczOut)
        };

    }

    getCurrentItemFromDB() {

        return data.find(_ => _.id === +this.props.match.params.number);

    }

    formatDate(customDate) {
        //return moment(customDate).format('DD.MM.YYYY HH:mm:ss');
        if ((typeof customDate) === 'string')
            return "---";
        else
            return moment(customDate).format('DD.MM.YYYY HH:mm:ss');
    }

    render() {

        return (
            <div>
                <Header sel={ this.state.id } />
                <div className="topBlockDetails">
                    <div className="headerDetails"><h2>{ this.state.regNum }</h2></div>
                    <table className="tableDetails">
                        <tbody>
                        <tr><td className="detailName">Въезд в ЗТК</td><td className="detail">{ this.state.cczIn }</td></tr>
                        <tr><td className="detailName">Сообщение</td><td className="detail">{ this.state.notification }</td></tr>
                        <tr><td className="detailName">ИДК</td><td className="detail">{ this.state.cis }</td></tr>
                        <tr><td className="detailName">Досмотр</td><td className="detail">{ this.state.inspection }</td></tr>
                        <tr><td className="detailName">Оформление</td><td className="detail">{ this.state.custClearance }</td></tr>
                        <tr><td className="detailName">Выезд из ЗТК</td><td className="detail">{ this.state.cczOut }</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }

}
