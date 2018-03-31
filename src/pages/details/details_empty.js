import React from 'react';

export default class DetailsEmptyPage extends React.Component {

    static path = '/details';

    render() {
        return (
            <div className="topBlockDetails">
                <div className="headerDetails"><h2>Рег. номер ТС</h2></div>
                <table className="tableDetails">
                    <tbody>
                    <tr><td className="detailName">Въезд в ЗТК</td><td className="detail">---</td></tr>
                    <tr><td className="detailName">Сообщение</td><td className="detail">---</td></tr>
                    <tr><td className="detailName">ИДК</td><td className="detail">---</td></tr>
                    <tr><td className="detailName">Досмотр</td><td className="detail">---</td></tr>
                    <tr><td className="detailName">Оформление</td><td className="detail">---</td></tr>
                    <tr><td className="detailName">Выезд из ЗТК</td><td className="detail">---</td></tr>
                    </tbody>
                </table>
            </div>

        );
    }

}
