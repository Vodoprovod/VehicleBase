import React from 'react';
import Header from '../../components/Header';

import { addElement } from '../../actions/testPageActions';
import { deleteElement } from '../../actions/testPageActions';

import { connect } from 'react-redux';

class TemporaryPage extends React.Component {

    static path = '/temporary';

    onClickHandle = () => {
        let text = this.refs.win.value;
        //this.props.dispatch(addElement(text));
        this.props.onClickProp(text);
        this.refs.win.value = '';
        this.focusOnInput();
    };

    onElementClickHandle = (e) => {
        let index = this.props.stateArray.indexOf(e.target.innerHTML);
        //this.props.dispatch(deleteElement(index));
        this.props.onElementClickProp(index);
        this.focusOnInput();
    };

    focusOnInput = () => document.getElementById('tempInput').focus();

    render() {
        return (
            <div className='temporaryPage'>
                <Header />
                <h1>This is a temporary page</h1>
                <p>
                    <input id='tempInput' ref='win'/>
                    <button onClick={ this.onClickHandle } >Add some shit</button>
                </p>
                <hr/>
                { this.props.stateArray.map(
                    (element, index) =>
                    <div
                        key={ index }
                        onClick={ this.onElementClickHandle }
                    >
                        { element }
                    </div>
                    )
                }

            </div>
        )
    }

};

const mapStateToProps = (state) => {
    return {
        stateArray: state.stateArray
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickProp: val => dispatch(addElement(val)),
        onElementClickProp: idx => dispatch(deleteElement(idx))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TemporaryPage);
