import React from 'react';
import moment from 'moment';
import './styles.less';

export default class Modal extends React.Component {

    state = {
        isOpen: false,
        isClicked: false,
        tempDate: null
    };

    static tempDate = null;

    modalFormNewRecord = (<div>
                    <div>
                        <label>Рег. номер ТС: <input id='inputRegNum' placeholder='Введите рег. номер ТС' /></label>
                    </div>
                    <div>
                        <label>Время взвешивания: <input id='inputСczIn'  /></label>
                        <button onClick={ this.setCurrentDateTime }>Время</button>
                    </div>
                </div>);

    constructor(props) {
        super(props);
    }

    setCurrentDateTime() {
        Modal.tempDate = new Date();
        document.getElementById('inputСczIn').value = moment(Modal.tempDate).format('DD.MM.YYYY HH:mm:ss');
    }

    handleClickButton(e) {

        console.log('Клик на кнопке модального окна: ', e.target.textContent);

        if (e.target.textContent === 'Отмена')
            this.props.onConfirm(false);
        else
            if (this.props.modalAction === 'Deleting')
                this.props.onConfirm(true);
            else if (this.props.modalAction === 'NewRecord') {
                //this.props.onConfirm({newData: 'Данные по новому ТС'});
                //проблема была в том, что getElementById возвращает элемент, а не массив
                let regNum = document.getElementById('inputRegNum').value;
                this.props.onConfirm({ regNum: regNum, inputСczIn: Modal.tempDate });
            }

        this.setState({ isClicked: !this.state.isClicked });

        this.closeWindow();
    }

    closeWindow() {
        let elt = document.getElementsByClassName('modal');
        elt[0].classList.remove('visible');

        let panels = document.getElementsByClassName('panel');
        panels[0].classList.remove('visible');
    }

    render() {

        let modalContent = this.props.modalContent ? this.props.modalContent : 'Content is empty';
        let modalTitle = this.props.modalTitle ? this.props.modalTitle : 'Title is empty';
        let modalFooter = this.props.modalFooter;

        return (
            <div className='modal'>
                <div className='modalTitle'>
                    <h1>{ modalTitle }</h1>
                </div>
                <div className='modalContent'>
                    <h2>{ modalContent }</h2>
                    { this.props.modalAction === 'NewRecord' ? this.modalFormNewRecord : null }
                </div>
                <div className='modalFooter'>
                    <button onClick={ this.handleClickButton.bind(this) }>{ modalFooter }</button>
                    <button onClick={ this.handleClickButton.bind(this) }>Отмена</button>
                </div>
            </div>
        );
    }

}
