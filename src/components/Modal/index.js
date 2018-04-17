import React from 'react';

export default class Modal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    closeWindow() {
        let elt = document.getElementsByClassName('modal');
        elt[0].classList.remove('visible');
        //this.setState({ isOpen: false });

        let panels = document.getElementsByClassName('panel');
        panels[0].classList.remove('visible');
        console.log(elt);
    }

    render() {
        return (
            <div className='modal'>
                <button onClick={ this.closeWindow }>Закрыть</button>
            </div>
        );
    }

}
