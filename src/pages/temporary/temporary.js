import React from 'react';
import Header from '../../components/Header';

class TemporaryPage extends React.Component {

    static path = '/temporary';

    onClickHandle = () => {
        alert('Button pushed!');
    };

    render() {
        return (
            <div class='temporaryPage'>
                <Header />
                <h1>This is a temporary page</h1>
                <p>
                <input id='tempInput'/>
                    <button onClick={ this.onClickHandle }>Add some shit</button>
                </p>
            </div>
        )
    }

};

export default TemporaryPage;