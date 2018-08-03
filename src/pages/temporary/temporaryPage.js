import React from 'react';

import Header from '../../components/Header';

class TemporaryPage extends React.Component {

    static path = '/temporary';

    static url='http://localhost:3000/api/temporarylist';

    renderItem(item, index) {
        let element = item.value;
        let elementId = item.id;

        //console.log('item ---> ' + item.id);

        return (
            <div
                key={ index }
                id={ elementId }
                className='record'
                /*onClick={ this.onElementClickHandle }*/
            >
                { element }
            </div>
        )
    }

    //Добавление записи
    onClickHandle = () => {

        let newRecord = {
            id: Math.random().toFixed(5) * 100000 ,
            val: this.refs.win.value
        };

        this.props.onClickProp(newRecord, TemporaryPage.url);
        //this.props.fetchData(TemporaryPage.url);

        this.refs.win.value = '';
        this.focusOnInput();
    };

    //Удаление записи
    onElementClickHandle = (e) => {
        if (e.target.className === 'record') {
            let id = e.target.id;
            //this.props.dispatch(deleteElement(index));

            this.props.onElementClickProp(id, TemporaryPage.url);
            this.focusOnInput();
        }
    };

    focusOnInput = () => document.getElementById('tempInput').focus();

    componentWillMount() {
        //this.fetchData('http://localhost:3000/api/temporarylist');
        this.props.fetchData(TemporaryPage.url);
    }

    render() {

        // console.log('render component isErrorListLoading ---> ' + this.props.isErrorListLoading);
        // console.log('render component isListLoading ---> ' + this.props.isListLoading);

        // if(this.props.isErrorListLoading)
        //     return <div><h1>Error list loading!</h1></div>;
        //
        // if(this.props.isListLoading)
        //     return <div><h1>List loading...</h1></div>;


        return (
            <div className='temporaryPage'>
                <Header />
                <h1>This is a temporary page</h1>
                <p>
                    <input id='tempInput' ref='win'/>
                    <button onClick={ this.onClickHandle } >Add some shit</button>
                </p>
                <hr/>
                { this.props.isErrorListLoading ? <div><h1>Error list loading!</h1></div> :
                    this.props.isListLoading ? <div><h1>List loading...</h1></div> :
                        <div onClick={ this.onElementClickHandle } className='tableBox'>
                            { this.props.stateArray.map(this.renderItem)}
                        </div>
                }

            </div>
        )
    }

};

export default TemporaryPage;

//{ this.props.stateArray.map(

// { this.state.stateArray.map(
//     (element, index) =>
//         <div
//             key={ index }
//             onClick={ this.onElementClickHandle }
//         >
//             { element }
//         </div>
// )
// }

// onElementClickHandle = (e) => {
//     if (e.target.className === 'record') {
//         let index = this.props.stateArray.indexOf(e.target.innerHTML);
//         //this.props.dispatch(deleteElement(index));
//         this.props.onElementClickProp(index);
//         this.focusOnInput();
//     }
// };

// fetch(url)
//     .then((response) => {
//         if(!response.ok) {
//             this.setState({ isErrorListLoading: true });
//             throw Error(response.statusText);
//         }
//
//         this.setState({ isListLoading: false });
//         this.setState({ isErrorListLoading: false });
//
//         console.log("response then1: " + response);
//         return response;
//     })
//     .then((response) => response.json())
//     .then((stateArray) => {
//         console.log('stateArray: ' + stateArray);
//         this.setState({ stateArray });
//     })
//     .catch((e) => {
//         console.log("Error at catch block: " + e);
//         this.setState({ isErrorListLoading: true });
//     });


// async fetchData(url) {
//
//     this.props.onToggleListLoading();
//
//     try {
//
//         const response = await fetch(url);
//
//         if(!response.ok) {
//             this.props.onToggleErrorListLoading();
//             throw Error(response.statusText);
//         }
//
//         if (this.props.isErrorListLoading) this.props.onToggleErrorListLoading();
//         this.props.onToggleListLoading();
//
//         const stateArray = await response.json();
//
//         this.props.onComponentWillMount(stateArray);
//
//     } catch (err) {
//         this.props.onToggleErrorListLoading();
//         console.log('Catched error: ' + err);
//     }
// }



//
// <div onClick={ this.onElementClickHandle } className='tableBox'>
//     { this.props.stateArray.map(this.renderItem)}
// </div>