import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './styles.less';

//export default class Modal extends React.Component {
class Modal extends React.Component {

    static tempDate = null;

    optionList = {
        'Сообщение': 'notification',
        'ИДК': 'cis',
        'Досмотр': 'inspection',
        'Оформление': 'custClearance',
        'Выезд из ЗТК': 'cczOut'
    };

    modalFormNewRecord = (<div>
                            <div>
                                <p><label>Рег. номер ТС: </label></p>
                                <p><input id='inputRegNum' placeholder='Введите рег. номер ТС' /></p>
                            </div>
                            <div>
                                <p><label>Время взвешивания: </label></p>
                                <p>
                                    <input id='inputСczIn'  />
                                    <button onClick={ this.setCurrentDateTime }> Сейчас </button>
                                </p>
                            </div>
                        </div>);

    modalFormEditRecord = (<div>
                            <p><label>Добавить этап контроля:</label></p>
                            <p><select id='selectOption'>
                                <option>Сообщение</option>
                                <option>ИДК</option>
                                <option>Досмотр</option>
                                <option>Оформление</option>
                                <option>Выезд из ЗТК</option>
                            </select></p>
                        </div>);

    setCurrentDateTime() {
        Modal.tempDate = new Date();
        document.getElementById('inputСczIn').value = moment(Modal.tempDate).format('DD.MM.YYYY HH:mm:ss');
    }

    handleClickButton(e) {

        //console.log('Клик на кнопке модального окна: ', e.target.textContent);

        if (e.target.textContent === 'Отмена')
            this.props.onConfirm(false);
        else
            if (this.props.modalAction === 'deleting') {
                this.props.onConfirm(true);
            } else if (this.props.modalAction === 'newRecord') {
                let regNum = document.getElementById('inputRegNum').value;
                this.props.onConfirm({ regNum: regNum, inputСczIn: Modal.tempDate });
            } else if (this.props.modalAction === 'editRecord') {
                Modal.tempDate = new Date();
                let param = this.optionList[document.getElementById('selectOption').value];
                let dataForSent = {};
                dataForSent[param] = Modal.tempDate;
                this.props.onConfirm(dataForSent);
            }

        //this.setState({ isClicked: !this.state.isClicked });

        this.closeWindow();
    }

    closeWindow() {
        let elt = document.getElementsByClassName('modal');
        elt[0].classList.remove('visible');

        let panels = document.getElementsByClassName('panel');
        panels[0].classList.remove('visible');
    }

    modalContentPanel(action) {
        switch (action) {
            case 'newRecord':
                return this.modalFormNewRecord;
                break;
            case 'editRecord':
                return this.modalFormEditRecord;
                break;
            default:
                return null;
        }
    }

    render() {

        let modalContent = this.props.modalContent ? this.props.modalContent : 'Content is empty';
        let modalTitle = this.props.modalTitle ? this.props.modalTitle : 'Title is empty';
        let modalFooter = this.props.modalFooter;

        return (
            <div className='modal'>
                <div className='modalTitle'>
                    <h4 className='modalTitleLabel'>{ modalTitle }</h4>
                </div>
                <div className='modalContent'>
                    <h3 className='modalContentLabel'>{ modalContent }</h3>
                    { this.modalContentPanel(this.props.modalAction) }
                </div>
                <div className='modalFooter'>
                    <button onClick={ this.handleClickButton.bind(this) }>{ modalFooter }</button>
                    <button onClick={ this.handleClickButton.bind(this) }>Отмена</button>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {

    return {
        modalTitle: state.setModalProps.modalTitle,
        modalContent: state.setModalProps.modalContent,
        modalFooter: state.setModalProps.modalFooter,
        modalAction: state.setModalProps.modalAction
    }
};

export default connect(mapStateToProps)(Modal);


// state = {
//     isOpen: false,
//     isClicked: false,
//     tempDate: null
// };