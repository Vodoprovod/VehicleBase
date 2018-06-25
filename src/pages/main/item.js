import React from 'react';
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
    }

    handleOnDoubleClick = () => {
        this.setState({ redirect: true });
    };

    // renderItem = (item, idx) => {
    //
    //     const format = (item === 'id' || item === 'regNum')
    //         ? identity // identity(arg) = arg
    //         : this.formatDate;
    //
    //     return (
    //         <td key={ idx }>
    //             { format(this.props[item]) }
    //         </td>
    //     );
    // };

    renderItem = (item, idx) => {
        return (
            <td key={ idx }>
                { this.props[item] }
            </td>
        );
    };

    render() {

        if (this.state.redirect) {
            //console.log('Item redirect id: ', this.props.id);
            return <Redirect push to={ `/details/${ this.props.id }` } />;
        }

        return (
            <tr className={ this.state.selected ? 'item selected' : 'item' }
                onDoubleClick={ this.handleOnDoubleClick }
            >
                { Object.keys(this.props).map(this.renderItem) }
            </tr>
        );
    }

}
