import React from 'react';
import moment from 'moment';
import { bindAll } from 'lodash';
import { Link, Redirect } from 'react-router-dom';
import { identity } from 'lodash'

export default class ListItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            selected: false
        };

        bindAll(this, [ 'formatDate' ]);
    }

    formatDate(customDate) {
        return moment(customDate).format('DD.MM.YYYY HH:mm:ss');
    }

    //---------------------------------ПОЧЕМУ НЕ РАБОТАЕТ???------------------------------
    // renderItem = (item, idx) => {
    //
    //     const format = (item === 'id' || item === 'regNum')
    //         ? identity // identity(arg) = arg
    //         : this.formatDate;
    //
    //     return (
    //         <td key={ idx }>
    //             <Link to={ `/details/${ this.props.id }` }>
    //                 { format(this.props[item]) }
    //             </Link>
    //         </td>
    //     );
    // }
    //
    // render() {
    //     return (
    //         <tr className="item">
    //             { Object.keys(this.props).map(this.renderItem) }
    //         </tr>
    //     );
    // }

    handleOnDoubleClick = () => {
        this.setState({ redirect: true });
    };

    handleOnClick = (e) => {
        //console.log(e.target.parentElement);
        //this.setState({ selected: true });
        //this.state.selected ? this.setState({ selected: false }) : this.setState({ selected: true }) ;
    };

    renderItem = (item, idx) => {

        const format = (item === 'id' || item === 'regNum')
            ? identity // identity(arg) = arg
            : this.formatDate;

        return (
            <td key={ idx }>
                { format(this.props[item]) }
            </td>
        );
    };

    render() {

        if (this.state.redirect) {
            return <Redirect push to={ `/details/${ this.props.id }` } />;
        }

        return (
            <tr className={ this.state.selected ? 'item selected' : 'item' }
                onDoubleClick={ this.handleOnDoubleClick }
                onClick={ this.handleOnClick }
            >
                { Object.keys(this.props).map(this.renderItem) }
            </tr>
        );
    }

}
