import React from 'react';
import Header from '../../components/Header';

import {addElement} from '../../actions/testPageActions';

import {connect} from 'react-redux';

class TemporaryPage extends React.Component {

    static path = '/temporary';

    onClickHandle = () => {
        this.props.dispatch(addElement(this.refs.win.value));
        this.refs.win.value = '';
    };

    render() {
        return (
            <div className='temporaryPage'>
                <Header />
                <h1>This is a temporary page</h1>
                <p>
                    <input id='tempInput' ref='win'/>
                    <button onClick={ this.onClickHandle }>Add some shit</button>
                </p>
                <hr/>
                { this.props.stateArray.map((element, index) => <div key={ index }>{ element }</div>) }

            </div>
        )
    }

};

const mapStateToProps = (state) => {
    return {
        stateArray: state.stateArray
    };
};

export default connect(mapStateToProps)(TemporaryPage);
