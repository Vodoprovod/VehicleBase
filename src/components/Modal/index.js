import React from 'react';
import './styles.less';

export default class Modal extends React.Component {

    state = {
        isOpen: false,
        isClicked: false
    };

    constructor(props) {
        super(props);


    }

    handleClickButton(e) {

        console.log('Клик на кнопке модального окна: ', e.target.textContent);

        if (e.target.textContent === 'Отмена')
            this.props.onConfirm(false);
        else
            this.props.onConfirm(true);

        this.setState({ isClicked: !this.state.isClicked });

        this.closeWindow();
    }

    closeWindow() {
        let elt = document.getElementsByClassName('modal');
        elt[0].classList.remove('visible');

        let panels = document.getElementsByClassName('panel');
        panels[0].classList.remove('visible');
        //console.log(elt);
    }

    componentDidUpdate() {
        console.log('Модальное окно обновлено');
    }

    render() {

        //console.log("Modal render");

        let modalContent = this.props.modalContent ? this.props.modalContent : 'Content is empty';
        let modalTitle = this.props.modalTitle ? this.props.modalTitle : 'Title is empty';
       //let modalFooter = this.props.modalFooter ? this.props.modalFooter : <button onClick={ this.closeWindow }>Отмена</button>;
        let modalFooter = this.props.modalFooter;

        return (
            <div className='modal'>
                <div className='modalTitle'>
                    <h1>{ modalTitle }</h1>
                </div>
                <div className='modalContent'>
                    <h2>{ modalContent }</h2>
                </div>
                <div className='modalFooter'>
                    <button onClick={ this.handleClickButton.bind(this) }>{ modalFooter }</button>
                    <button onClick={ this.handleClickButton.bind(this) }>Отмена</button>
                </div>
            </div>
        );
    }

}
